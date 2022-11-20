from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from Assign import models

class HrAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.query_params.get("token")
        if not token:
            return

        hr_object = models.HR.objects.filter(token=token).first()
        if hr_object:
            return hr_object, token  # request.user = Hr; request.auth = token

    def authenticate_header(self, request):
        # return 'Basic realm="API"'
        return "API"