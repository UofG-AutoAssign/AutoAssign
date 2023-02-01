import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from Assign import models

from ext.per import HrPermission, ManagerPermission, GradPermission
from Assign import serializers
from ext.jwt_auth import create_token

from ext.Hash_encryption import hashEncryption


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

        # Hash verification
        hash_pwd = hashEncryption(pwd)

        manger_object = models.Manager.objects.filter(email=user, password=hash_pwd).first()
        hr_object = models.HR.objects.filter(email=user, password=hash_pwd).first()
        grad_object = models.Graduate.objects.filter(email=user, password=hash_pwd).first()

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
            return Response({'status': True, 'user_type': user_type, 'token': token})

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


class HrViewCreate(APIView):
    permission_classes = [HrPermission, ]

    # 1.Get initial data
    def post(self, request):
        # 2 Check data format

        ser_role = serializers.RoleSerializer(data=request.data)

        if ser_role.is_valid():
            role = ser_role.validated_data["role"]

            # Hashing encryption requires the stored password
            hash_pwd = hashEncryption(request.data['password'])
            request.data['password'] = hash_pwd

        if role == 1:
            ser = serializers.CreateGraduateSerializer(data=request.data)
            context = {"status": True, "Create": "Graduate", "Status": "success"}
        elif role == 2:
            ser = serializers.CreateMangerSerializer(data=request.data)
            context = {"status": True, "Create": "Manager", "Status": "success"}
        elif role == 3:
            ser = serializers.CreateHrSerializer(data=request.data)
            context = {"status": True, "Create": "Hr", "Status": "success"}

        if ser.is_valid():
            ser.save()
            return Response(context)

        return Response({"code": 1001, 'error': "registration failed", "detail": ser.errors})


class SkillView(APIView):

    def get(self, request):
        skill_QuerySet = models.Skill.objects.all()

        ser = serializers.SkillSerializer(instance=skill_QuerySet, many=True)

        context = {"status": True, "data": ser.data}
        return Response(context)


class FormView(APIView):
    permission_classes = [GradPermission, ]

    def get(self, request):
        # Find the corresponding form

        ser = serializers.FormSerializer(instance=request.user)

        # Find the corresponding skill name

        context = {"status": True, "data": ser.data}

        return Response(context)


class ChangePassword(APIView):

    def put(self, request):
        pwd = request.data.get("pwd")
        pwd1 = request.data.get("pwd1")
        pwd2 = request.data.get("pwd2")

        User = request.user
        hash_pwd = hashEncryption(pwd)

        if pwd1 != pwd2:
            return Response({"code": 400, 'error': "Please check whether the passwords entered are consistent"})

        if hash_pwd != User.password:
            return Response({'status': False, 'error': 'password error'})

        hash_pwd = hashEncryption(pwd1)
        User.password = hash_pwd
        User.save()

        context = {"status": True, "data": "Password Changed"}

        return Response(context)


class FormView(APIView):
    permission_classes = [GradPermission, ]

    def get(self, request):
        # Find the corresponding form

        ser = serializers.FormSerializer(instance=request.user)

        # Find the corresponding skill name

        context = {"status": True, "data": ser.data}

        return Response(context)


class TeamView(APIView):
    permission_classes = [ManagerPermission, ]

    def get(self, request):
        user_obj = request.user
        team_obj = models.Team.objects.filter(man_id=user_obj).first()
        if team_obj:
            grad_QuerySet = models.Graduate.objects.filter(team_id=team_obj).all()
            ser = serializers.TeamViewSerializer(instance=grad_QuerySet, many=True)
            context = {"status": True, "data": ser.data}
            return Response(context)

        return Response({'status': False, 'error': 'This manager has no Team yet'})


class TeamSettingView(APIView):
    permission_classes = [ManagerPermission, ]

    def get(self, request):
        # Find the corresponding form
        user_obj = request.user
        team_obj = models.Team.objects.filter(man_id=user_obj).first()

        ser = serializers.TeamSettingViewSerializer(instance=team_obj)

        # Find the corresponding skill name

        context = {"status": True, "data": ser.data}

        return Response(context)


class CreateTeamView(APIView):
    permission_classes = [HrPermission, ]

    # 1.Get initial data
    def post(self, request):
        # 2 Check data format
        ser = serializers.CreateTeamSerializer(data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"status": True, "Create": "Team", "Status": "success"}
            return Response(context)

        return Response({"code": 1001, 'error': "Create Team failed", "detail": ser.errors})


class UpdateTeamSetting(APIView):
    permission_classes = [ManagerPermission, ]

    def put(self, request):
        Man_Obj = request.user
        Team_Obj = models.Team.objects.filter(man_id=Man_Obj).first()

        if not Team_Obj:
            return Response(
                {"code": 1001, 'error': "Update Team failed", "detail": "This Manager dont have a team yet"})

        ser = serializers.UpdateTeamSettingSerializer(instance=Team_Obj, data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"status": True, "Team_id": Team_Obj.id, "detail": "Updated"}
            return Response(context)

        return Response({"code": 1001, 'error': "Update Team failed", "detail": ser.errors})
