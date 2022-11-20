from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from Assign import models


class QueryParamsAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.query_params.get("token")
        print(token)
        if not token:
            return

        manger_object = models.Manager.objects.filter(token=token).first()
        hr_object = models.HR.objects.filter(token=token).first()
        grad_object = models.Graduate.objects.filter(token=token).first()

        if manger_object:
            return manger_object, token  # request.user = user object; request.auth = token

        if hr_object:
            print("hr")
            return hr_object, token

        if grad_object:
            return grad_object, token

    def authenticate_header(self, request):
        # return 'Basic realm="API"'
        return "Assign"


class HeaderAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get("HTTP_AUTHORIZATION")
        print(token)
        if not token:
            return

        manger_object = models.Manager.objects.filter(token=token).first()
        hr_object = models.HR.objects.filter(token=token).first()
        grad_object = models.Graduate.objects.filter(token=token).first()

        if manger_object:
            return manger_object, token  # request.user = user object; request.auth = token

        if hr_object:
            return hr_object, token

        if grad_object:
            return grad_object, token

    def authenticate_header(self, request):
        # return 'Basic realm="API"'
        return "Assign"


class NoAuthentication(BaseAuthentication):

    def authenticate(self, request):
        raise AuthenticationFailed({"status": False, 'msg': "Authentication failed"})

    def authenticate_header(self, request):
        return "Assign"
