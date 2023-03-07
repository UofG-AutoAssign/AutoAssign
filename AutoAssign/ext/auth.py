from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import exceptions

from Assign import models

from ext.jwt_auth import parse_payload


def locateUser(payload):
    data = payload['data']
    user = data['email']

    manger_object = models.Manager.objects.filter(email=user).first()
    hr_object = models.HR.objects.filter(email=user).first()
    grad_object = models.Graduate.objects.filter(email=user).first()

    if manger_object:
        return manger_object
    elif hr_object:
        return hr_object
    elif grad_object:
        return grad_object


class JwtQueryParamAuthentication(BaseAuthentication):
    """
   The user needs to transfer the parameters in the url to transfer tokens, for example:
    http://www.abc.com?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM1NTU1NzksInVzZXJuYW1lIjoid3VwZWlxaSIsInVzZXJfaWQiOjF9.xj-7qSts6Yg5Ui55-aUOHJS4KSaeLq5weXMui2IIEJU
    """

    def authenticate(self, request):
        token = request.query_params.get('token')
        payload = parse_payload(token)
        if not payload['status']:
            return

        user_object = locateUser(payload)
        return user_object, token


class JwtAuthorizationAuthentication(BaseAuthentication):
    """
       Users need to transfer tokens in the form of request headers, for example:
       Authorization:jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM1NTU1NzksInVzZXJuYW1lIjoid3VwZWlxaSIsInVzZXJfaWQiOjF9.xj-7qSts6Yg5Ui55-aUOHJS4KSaeLq5weXMui2IIEJU
       """

    def authenticate(self, request):
        # Verification token is required for non-login pages
        token = request.META.get("HTTP_AUTHORIZATION")
        payload = parse_payload(token)
        if not payload['status']:
            raise exceptions.AuthenticationFailed(payload)

        user_object = locateUser(payload)
        return user_object, token


class NoAuthentication(BaseAuthentication):

    def authenticate(self, request):
        raise AuthenticationFailed({"status": False, 'msg': "Authentication failed"})

    def authenticate_header(self, request):
        return "Assign"
