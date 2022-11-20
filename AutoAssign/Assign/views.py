import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from Assign import models


# Create your views here.

class LoginView(APIView):

    def post(self, request):
        # 1.Receive username and password submitted by user POST
        # print(request.query_params)
        user = request.data.get("username")
        pwd = request.data.get("password")

        # Test
        # print(request.data)

        # 2.database validation
        manger_object = models.Manager.objects.filter(man_email=user, password=pwd).first()
        hr_object = models.HR.objects.filter(hr_email=user, password=pwd).first()
        grad_object = models.Graduate.objects.filter(grad_email=user, password=pwd).first()

        token = str(uuid.uuid4())

        if manger_object:
            # check the token

            manger_object.token = token
            manger_object.save()

            return Response({"status": True, 'User Type': 'Manger', 'data': token})

        if hr_object:
            hr_object.token = token
            hr_object.save()

            return Response({"status": True, "UserType": "HR", 'data': token})

        if grad_object:
            grad_object.token = token
            grad_object.save()

            return Response({"status": True, 'User Type': 'Graduate', 'data': token})

        return Response({"status": False, 'msg': "username or password is incorrect"})


class HrView(APIView):
    def get(self, request):
        print(request.user, request.auth)
        return Response("HrView")

    def post(self, request):
        print(request.user, request.auth)
        return Response("HrView")
