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
            return Response({"code": 200, 'status': True, 'user_type': user_type, 'token': token})

        return Response({"code": 403, 'status': False, 'error': 'User name or password error'})


class HrView(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        ser = serializers.HrSerializer(instance=request.user)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)

    def put(self, request):
        ser = serializers.HrSerializer(instance=request.user, data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True, "Hr_id": request.user.id, "data": ser.data}
            return Response(context)

        return Response(
            {"code": 403, "status": False, 'error': "Update personal information Fail", "detail": ser.errors})


class GradView(APIView):
    permission_classes = [GradPermission, ]

    def get(self, request):
        ser = serializers.GradSerializer(instance=request.user)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)

    def put(self, request):
        ser = serializers.GradSerializer(instance=request.user, data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True, "Grad_id": request.user.id, "data": ser.data}
            return Response(context)

        return Response(
            {"code": 403, "status": False, 'error': "Update personal information Fail", "detail": ser.errors})


class ManView(APIView):
    permission_classes = [ManagerPermission, ]

    def get(self, request):
        ser = serializers.ManSerializer(instance=request.user)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)

    def put(self, request):
        ser = serializers.ManSerializer(instance=request.user, data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True, "Man_id": request.user.id, "data": ser.data}
            return Response(context)

        return Response(
            {"code": 403, "status": False, 'error': "Update personal information Fail", "detail": ser.errors})


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
            context = {"code": 200, "status": True, "Create": "Graduate", "Status": "success"}
        elif role == 2:
            ser = serializers.CreateMangerSerializer(data=request.data)
            context = {"code": 200, "status": True, "Create": "Manager", "Status": "success"}
        elif role == 3:
            ser = serializers.CreateHrSerializer(data=request.data)
            context = {"code": 200, "status": True, "Create": "Hr", "Status": "success"}

        if ser.is_valid():
            ser.save()
            return Response(context)

        return Response({"code": 403, "status": False, 'error': "registration failed", "detail": ser.errors})


class SkillView(APIView):

    def get(self, request):
        skill_QuerySet = models.Skill.objects.all()

        ser = serializers.SkillSerializer(instance=skill_QuerySet, many=True)

        context = {"code": 200, "status": True, "data": ser.data}
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
            return Response({"code": 403, "status": False, 'error': 'password error'})

        hash_pwd = hashEncryption(pwd1)
        User.password = hash_pwd
        User.save()

        context = {"code": 200, "status": True, "data": "Password Changed"}

        return Response(context)


class FormView(APIView):
    permission_classes = [GradPermission, ]

    def get(self, request):
        ser = serializers.FormSerializer(instance=request.user)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)

    def post(self, request):
        grad_obj = request.user
        grad_id = grad_obj.id
        Form = models.Form.objects.filter(graduate=grad_obj).all()

        ser = serializers.UpdateFormSerializer(data=request.data, many=True)

        # The front end is not allowed to illegally add forms for other grads through this interface
        for i in request.data:
            if i["graduate"] != grad_id:
                return Response({"code": 403, "status": False, 'error': "Update Form failed",
                                 "detail": "Please Check Graduate id "})

        if ser.is_valid():
            Form.delete()
            ser.save()
            return self.get(request)

        return Response({"code": 403, "status": False, 'error': "Update Form failed", "detail": ser.errors})


class TeamMemberView(APIView):
    permission_classes = [ManagerPermission, ]

    def get(self, request):
        user_obj = request.user
        team_obj = models.Team.objects.filter(man_id=user_obj).first()
        if team_obj:
            grad_QuerySet = models.Graduate.objects.filter(team_id=team_obj).all()
            ser = serializers.TeamViewSerializer(instance=grad_QuerySet, many=True)
            context = {"code": 200, "status": True, "data": ser.data}
            return Response(context)

        return Response({"code": 403, "status": False, 'error': 'This manager has no Team yet'})


class TeamSettingView(APIView):
    permission_classes = [ManagerPermission, ]

    def get(self, request):
        # Find the corresponding form
        user_obj = request.user
        team_obj = models.Team.objects.filter(man_id=user_obj).first()

        ser = serializers.TeamSettingViewSerializer(instance=team_obj)

        # Find the corresponding skill name

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)

    def put(self, request):
        Man_Obj = request.user
        Team_Obj = models.Team.objects.filter(man_id=Man_Obj).first()

        if not Team_Obj:
            return Response(
                {"code": 403, "status": False, 'error': "Update Team failed",
                 "detail": "This Manager dont have a team yet"})

        ser = serializers.UpdateTeamSettingSerializer(instance=Team_Obj, data=request.data)

        if ser.is_valid():
            ser.save()

            return self.get(request)

        return Response({"code": 403, "status": False, 'error': "Update Team failed", "detail": ser.errors})


class CreateTeamView(APIView):
    permission_classes = [HrPermission, ]

    # 1.Get initial data
    def post(self, request):
        # 2 Check data format
        ser = serializers.CreateTeamSerializer(data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True, "Create": "Team", "Status": "success"}
            return Response(context)

        return Response({"code": 403, "status": False, 'error': "Create Team failed", "detail": ser.errors})


class AllTeamView(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        team_obj = models.Team.objects.filter().all()

        ser = serializers.AllTeamViewSerializer(instance=team_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class AllGradView(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        team_obj = models.Graduate.objects.filter().all()

        ser = serializers.AllGradSerializer(instance=team_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class AllManView(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        team_obj = models.Manager.objects.filter().all()

        ser = serializers.AllManSerializer(instance=team_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class DeleteMan(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):
        data = request.data
        Man_id = data['id']

        Man_obj = models.Manager.objects.filter(id=Man_id).first()

        context = {"code": 403, "status": False, "detail": "Fail to delete"}

        if Man_obj:
            Man_obj.delete()
            context = {"code": 200, "status": True, "detail": "Has been deleted"}

        return Response(context)


class DeleteGrad(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):
        data = request.data
        Grad_id = data['id']

        Grad_obj = models.Graduate.objects.filter(id=Grad_id).first()

        context = {"code": 403, "status": False, "detail": "Fail to delete"}

        if Grad_obj:
            Grad_obj.delete()
            context = {"code": 200, "status": True, "detail": "Has been deleted"}

        return Response(context)


class AssignGradToTeam(APIView):
    permission_classes = [HrPermission, ]

    def put(self, request):

        data = request.data
        Grad_id = data['Grad_id']

        Grad_obj = models.Graduate.objects.filter(id=Grad_id).first()

        Team_id = data['team_id']
        Team_obj = models.Team.objects.filter(id=Team_id).first()

        if not Grad_obj:
            return Response(
                {"code": 403, "status": False, 'error': "Assign Grad failed", "detail": "Please Check Graduate"})

        if not Team_obj:
            return Response(
                {"code": 403, "status": False, 'error': "Assign Team failed", "detail": "Please Check Team"})

        ser = serializers.AssignGraduate(instance=Grad_obj, data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True, "Grad_id": Grad_obj.id, "Team_id": Team_obj.id, "detail": "Updated"}
            return Response(context)

        return Response({"code": 403, "status": False, 'error': "Assign failed", "detail": ser.errors})


class AssignManToTeam(APIView):
    permission_classes = [HrPermission, ]

    def put(self, request):

        data = request.data

        Man_id = data['man_id']
        Man_obj = models.Manager.objects.filter(id=Man_id).first()

        Team_id = data['team_id']
        Team_obj = models.Team.objects.filter(id=Team_id).first()

        if not Man_obj:
            return Response(
                {"code": 403, "status": False, 'error': "Assign Grad failed", "detail": "Please Check Manger"})

        if not Team_obj:
            return Response(
                {"code": 403, "status": False, 'error': "Assign Team failed", "detail": "Please Check Team"})

        Current_Team = models.Team.objects.filter(man_id=Man_id).first()

        if Current_Team:
            Current_Team.man_id = None
            Current_Team.save()

        ser = serializers.AssignManger(instance=Team_obj, data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True, "Man_id": Man_obj.id, "Team_id": Team_obj.id,
                       "detail": "Updated"}
            return Response(context)

        return Response({"code": 403, "status": False, 'error': "Assign failed", "detail": ser.errors})


class CreateDepartment(APIView):
    permission_classes = [HrPermission, ]

    # 1.Get initial data
    def post(self, request):
        # 2 Check data format
        ser = serializers.CreateDepartment(data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True, "Create": "Department", "Status": "success", "data": ser.data}
            return Response(context)

        return Response({"code": 403, "status": False, 'error': "Create Team failed", "detail": ser.errors})

class AssignTeamToDepartment(APIView):
    permission_classes = [HrPermission, ]

    def put(self, request):
        data = request.data

        depart_id = data['depart_id']
        depart_obj = models.Department.objects.filter(id=depart_id).first()

        Team_id = data['team_id']
        Team_obj = models.Team.objects.filter(id=Team_id).first()

        if not depart_obj:
            return Response(
                {"code": 403, "status": False, 'error': "Assign Grad failed", "detail": "Please Check Department"})

        if not Team_obj:
            return Response(
                {"code": 403, "status": False, 'error': "Assign Team failed", "detail": "Please Check Team"})

        ser = serializers.AssignTeamtoDepartment(instance=Team_obj, data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True, "Status": "success", "data": ser.data}
            return Response(context)

        return Response({"code": 403, "status": False, 'error': "Assign Team failed", "detail": ser.errors})