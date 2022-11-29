import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from Assign import models

from ext.per import HrPermission, ManagerPermission, GradPermission
from Assign import serializers
from ext.jwt_auth import create_token


# Create your views here.

class LoginView(APIView):
    authentication_classes = []

    def post(self, request):
        # 1.Receive username and password submitted by user POST
        # print(request.query_params)
        user = request.data.get("username")
        pwd = request.data.get("password")

        # Test
        # print(request.data)

        # 2.database validation
        manger_object = models.Manager.objects.filter(email=user, password=pwd).first()
        hr_object = models.HR.objects.filter(email=user, password=pwd).first()
        grad_object = models.Graduate.objects.filter(email=user, password=pwd).first()

        user_object = False
        if manger_object:
            user_object = manger_object
            token = create_token({'email': manger_object.email})
            user_type = 'Manger'

        if hr_object:
            user_object = hr_object
            token = create_token({'email': hr_object.email})
            user_type = 'Hr'

        if grad_object:
            user_object = grad_object
            token = create_token({'email': grad_object.email})
            user_type = 'Graduate'

        if user_object:
            return Response({'status': True, 'User Type': user_type, 'token': token})

        return Response({'status': False, 'error': 'User name or password error'})


class HrView(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        ser = serializers.HrSerializer(instance=request.user)

        context = {"status": True, "data": ser.data}

        return Response(context)


class GradView(APIView):
    permission_classes = [GradPermission, ]

    def get(self, request):
        ser = serializers.GradSerializer(instance=request.user)

        context = {"status": True, "data": ser.data}

        return Response(context)

class ManView(APIView):
    permission_classes = [ManagerPermission, ]

    def get(self, request):
        ser = serializers.ManSerializer(instance=request.user)

        context = {"status": True, "data": ser.data}

        return Response(context)


class HrViewCreat(APIView):
    permission_classes = [HrPermission, ]

    # 1.Get initial data
    def post(self, request):
        # 2 Check data format

        ser_role = serializers.RoleSerializer(data=request.data)

        if ser_role.is_valid():
            role = ser_role.validated_data["role"]

        if role == 1:
            ser = serializers.CreatGraduateSerializer(data=request.data)
            context = {"status": True, "Create": "Graduate", "Status": "success"}
        elif role == 2:
            ser = serializers.CreatMangerSerializer(data=request.data)
            context = {"status": True, "Create": "Manager", "Status": "success"}
        elif role == 3:
            ser = serializers.CreatHrSerializer(data=request.data)
            context = {"status": True, "Create": "Hr", "Status": "success"}

        if ser.is_valid():
            ser.save()
            return Response(context)

        return Response({"code": 1001, 'error': "registration failed", "detail": ser.errors})
