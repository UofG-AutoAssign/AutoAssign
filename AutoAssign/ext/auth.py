"""
Authentication component that verifies user identity,
and determines whether they have the appropriate permissions.
"""
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import exceptions

# pylint: disable=E0401
from Assign import models

# pylint: disable=E0401
from ext.jwt_auth import parse_payload


def locate_user(payload):
    """
        Locate the user in the database based on the given payload.

        Args:
            payload (dict): A dictionary containing the user data.

        Returns:
            The user object in the database.
    """
    data = payload['data']
    user = data['email']

    manger_object = models.Manager.objects.filter(email=user).first()
    hr_object = models.HR.objects.filter(email=user).first()
    grad_object = models.Graduate.objects.filter(email=user).first()

    if manger_object:
        return manger_object
    if hr_object:
        return hr_object
    if grad_object:
        return grad_object

    return None


class JwtQueryParamAuthentication(BaseAuthentication):
    """
    The user needs to transfer the parameters in the url to transfer tokens, for example:
    """

    def authenticate(self, request):
        token = request.query_params.get('token')
        payload = parse_payload(token)
        if not payload['status']:
            return None

        user_object = locate_user(payload)
        return user_object, token


class JwtAuthorizationAuthentication(BaseAuthentication):
    """
       Users need to transfer tokens in the form of request headers, for example:
    """

    def authenticate(self, request):
        # Verification token is required for non-login pages
        token = request.META.get("HTTP_AUTHORIZATION")
        payload = parse_payload(token)
        if not payload['status']:
            raise exceptions.AuthenticationFailed(payload)

        user_object = locate_user(payload)
        return user_object, token


class NoAuthentication(BaseAuthentication):
    """
        Unauthorized
    """

    def authenticate(self, request):
        raise AuthenticationFailed({"status": False, 'msg': "Authentication failed"})

    def authenticate_header(self, request):
        return "Assign"
