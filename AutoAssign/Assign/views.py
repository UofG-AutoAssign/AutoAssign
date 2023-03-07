from rest_framework.views import APIView
from rest_framework.response import Response

from django.core.mail import send_mail

from ext.per import HrPermission, ManagerPermission, GradPermission
from ext.jwt_auth import create_token
from ext.Hash_encryption import hashEncryption

from Assign import serializers
from Assign import models


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

        # Hash Password and validation
        hash_pwd = hashEncryption(pwd)

        manger_object = models.Manager.objects.filter(email=user, password=hash_pwd).first()
        hr_object = models.HR.objects.filter(email=user, password=hash_pwd).first()
        grad_object = models.Graduate.objects.filter(email=user, password=hash_pwd).first()

        user_object = False
        if manger_object:
            user_object = manger_object
            token = create_token({'email': manger_object.email})
            user_type = 'Manager'

        elif hr_object:
            user_object = hr_object
            token = create_token({'email': hr_object.email})
            user_type = 'Hr'

        elif grad_object:
            user_object = grad_object
            token = create_token({'email': grad_object.email})
            user_type = 'Graduate'

        if user_object:
            '''
            If user successfully logged in, 
            the token that reset the password will be deleted to ensure 
            -that other users will not use the token to change the password again.
            '''
            user_object.token = None
            user_object.save()

            return Response({"code": 200, 'status': True, 'user_type': user_type, 'token': token})

        return Response({"code": 403, 'status': False, 'error': 'User name or password error'})


class Register(APIView):
    authentication_classes = []

    def post(self, request):

        token = request.data['token']

        pwd1 = request.data['pwd1']

        pwd2 = request.data['pwd2']

        if pwd1 != pwd2:
            return Response({"code": 403, "status": False, 'error': "Please confirm your password"})

        # Check this register
        register_obj = models.Registration.objects.filter(token=token).first()

        if not register_obj:
            return Response({"code": 403, "status": False, 'error': "token wrong"})

        # Check the user information
        role = register_obj.role
        email = register_obj.email

        # Hash the password
        hash_pwd = hashEncryption(pwd2)

        # Generating a register data

        first_name = request.data['first_name']
        second_name = request.data['second_name']

        registration_data = {"email": email, 'password': hash_pwd,
                             'first_name': first_name, 'second_name': second_name}

        context = {"code": 403, "status": False, 'error': "Failed to register"}

        if role == 1:
            ser = serializers.RegisterGraduate(data=registration_data)

            if ser.is_valid():
                ser.save()
                context = {"code": 200, "status": True,
                           "detail": "Has been added", "data": ser.data}
            else:
                return Response({"code": 403, "status": False,
                                 'error': "Failed to register", "detail": ser.errors})

        elif role == 2:
            ser = serializers.RegisterManager(data=registration_data)

            if ser.is_valid():
                ser.save()
                context = {"code": 200, "status": True,
                           "detail": "Has been added", "data": ser.data}
            else:
                return Response({"code": 403, "status": False,
                                 'error': "Failed to register", "detail": ser.errors})

        """
            If Successful registered , Deleted this register 
            -obj to make sure no one use it update info again
        """
        if context.get('code') == 200:
            register_obj.delete()

        return Response(context)


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
            {"code": 403, "status": False,
             'error': "Update personal information Fail", "detail": ser.errors})


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
            context = {"code": 200, "status": True,
                       "Grad_id": request.user.id, "data": ser.data}
            return Response(context)

        return Response(
            {"code": 403, "status": False,
             'error': "Update personal information Fail", "detail": ser.errors})


class ViewGradTeamInfo(APIView):
    permission_classes = [GradPermission, ]

    def get(self, request):
        grad_obj = request.user
        team_obj = grad_obj.team_id

        if team_obj:
            grad_queryset = models.Graduate.objects.filter(team_id=team_obj).all()
            ser = serializers.TeamViewSerializer(instance=grad_queryset, many=True)

            context = {"code": 200, "status": True, "data": ser.data}

            return Response(context)

        return Response({"code": 403, "status": False,
                         'error': "This Graduate dose not has a team yet"})


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
            {"code": 403, "status": False,
             'error': "Update personal information Fail", "detail": ser.errors})


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

        return Response({"code": 403, "status": False,
                         'error': "registration failed", "detail": ser.errors})


class SkillView(APIView):

    def get(self, request):
        skill_queryset = models.Skill.objects.all()

        ser = serializers.SkillSerializer(instance=skill_queryset, many=True)

        context = {"code": 200, "status": True, "data": ser.data}
        return Response(context)


class ChangePassword(APIView):

    def put(self, request):
        pwd = request.data.get("pwd")
        pwd1 = request.data.get("pwd1")
        pwd2 = request.data.get("pwd2")

        user = request.user
        hash_pwd = hashEncryption(pwd)

        if pwd1 != pwd2:
            return Response({"code": 400,
                             'error': "Please check whether the passwords entered are consistent"})

        if hash_pwd != user.password:
            return Response({"code": 403, "status": False, 'error': 'password error'})

        hash_pwd = hashEncryption(pwd1)
        user.password = hash_pwd
        user.save()

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
        form = models.Form.objects.filter(graduate=grad_obj).all()

        ser = serializers.UpdateFormSerializer(data=request.data, many=True)

        # The front end is not allowed to illegally add forms for other grads through this interface
        for i in request.data:
            if i["graduate"] != grad_id:
                return Response({"code": 403, "status": False, 'error': "Update Form failed",
                                 "detail": "Please Check Graduate id "})

        if ser.is_valid():
            form.delete()
            ser.save()
            return self.get(request)

        return Response({"code": 403, "status": False,
                         'error': "Update Form failed", "detail": ser.errors})


class TeamMemberView(APIView):
    permission_classes = [ManagerPermission, ]

    def get(self, request):
        user_obj = request.user
        team_obj = models.Team.objects.filter(man_id=user_obj).first()
        if team_obj:
            grad_queryset = models.Graduate.objects.filter(team_id=team_obj).all()
            ser = serializers.TeamViewSerializer(instance=grad_queryset, many=True)
            context = {"code": 200, "status": True, "data": ser.data}
            return Response(context)

        return Response({"code": 403, "status": False, 'error': 'This manager has no Team yet'})


class TeamSettingView(APIView):
    permission_classes = [ManagerPermission, ]

    def get(self, request):
        # Find the corresponding form
        user_obj = request.user
        team_obj = models.Team.objects.filter(man_id=user_obj).first()

        if team_obj:
            ser = serializers.TeamSettingViewSerializer(instance=team_obj)
            context = {"code": 200, "status": True, "data": ser.data}
            return Response(context)

        # Find the corresponding skill name

        return Response({"code": 403, "status": False, 'error': 'This manager dose not has a team'})

    def put(self, request):
        man_obj = request.user
        team_obj = models.Team.objects.filter(man_id=man_obj).first()

        if not team_obj:
            return Response(
                {"code": 403, "status": False, 'error': "Update Team failed",
                 "detail": "This Manager dont have a team yet"})

        ser = serializers.UpdateTeamSettingSerializer(instance=team_obj, data=request.data)

        if ser.is_valid():
            ser.save()

            return self.get(request)

        return Response({"code": 403, "status": False,
                         'error': "Update Team failed", "detail": ser.errors})


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

        return Response({"code": 403, "status": False,
                         'error': "Create Team failed", "detail": ser.errors})


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
        man_id = data['id']

        man_obj = models.Manager.objects.filter(id=man_id).first()

        context = {"code": 403, "status": False, "detail": "Fail to delete"}

        if man_obj:
            man_obj.delete()
            context = {"code": 200, "status": True, "detail": "Has been deleted"}

        return Response(context)


class DeleteGrad(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):
        data = request.data
        grad_id = data['id']

        grad_obj = models.Graduate.objects.filter(id=grad_id).first()

        context = {"code": 403, "status": False, "detail": "Fail to delete"}

        if grad_obj:
            grad_obj.delete()
            context = {"code": 200, "status": True, "detail": "Has been deleted"}

        return Response(context)


class AssignGradToTeam(APIView):
    permission_classes = [HrPermission, ]

    def put(self, request):

        data = request.data
        grad_id = data['Grad_id']

        grad_obj = models.Graduate.objects.filter(id=grad_id).first()

        team_id = data['team_id']
        team_obj = models.Team.objects.filter(id=team_id).first()

        if not grad_obj:
            return Response(
                {"code": 403, "status": False,
                 'error': "Assign Grad failed", "detail": "Please Check Graduate"})

        if not team_obj:
            return Response(
                {"code": 403, "status": False,
                 'error': "Assign Team failed", "detail": "Please Check Team"})

        ser = serializers.AssignGraduate(instance=grad_obj, data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True,
                       "Grad_id": grad_obj.id, "Team_id": team_obj.id, "detail": "Updated"}
            return Response(context)

        return Response({"code": 403, "status": False,
                         'error': "Assign failed", "detail": ser.errors})


class AssignManToTeam(APIView):
    permission_classes = [HrPermission, ]

    def put(self, request):

        data = request.data

        man_id = data['man_id']
        man_obj = models.Manager.objects.filter(id=man_id).first()

        team_id = data['team_id']
        team_obj = models.Team.objects.filter(id=team_id).first()

        if not man_obj:
            return Response(
                {"code": 403, "status": False,
                 'error': "Assign Grad failed", "detail": "Please Check Manger"})

        if not team_obj:
            return Response(
                {"code": 403, "status": False,
                 'error': "Assign Team failed", "detail": "Please Check Team"})

        current_team = models.Team.objects.filter(man_id=man_id).first()

        if current_team:
            current_team.man_id = None
            current_team.save()

        ser = serializers.AssignManager(instance=team_obj, data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True,
                       "Man_id": man_obj.id, "Team_id": team_obj.id,
                       "detail": "Updated"}
            return Response(context)

        return Response({"code": 403, "status": False,
                         'error': "Assign failed", "detail": ser.errors})


class CreateDepartment(APIView):
    permission_classes = [HrPermission, ]

    # 1.Get initial data
    def post(self, request):
        # 2 Check data format
        ser = serializers.CreateDepartment(data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True,
                       "Create": "Department", "Status": "success", "data": ser.data}
            return Response(context)

        return Response({"code": 403, "status": False,
                         'error': "Create Team failed", "detail": ser.errors})


class AssignTeamToDepartment(APIView):
    permission_classes = [HrPermission, ]

    def put(self, request):
        data = request.data

        depart_id = data['depart_id']
        depart_obj = models.Department.objects.filter(id=depart_id).first()

        team_id = data['team_id']
        team_obj = models.Team.objects.filter(id=team_id).first()

        if not depart_obj:
            return Response(
                {"code": 403, "status": False,
                 'error': "Assign Grad failed", "detail": "Please Check Department"})

        if not team_obj:
            return Response(
                {"code": 403, "status": False,
                 'error': "Assign Team failed", "detail": "Please Check Team"})

        ser = serializers.AssignTeamtoDepartment(instance=team_obj, data=request.data)

        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True,
                       "Status": "success", "data": ser.data}
            return Response(context)

        return Response({"code": 403, "status": False,
                         'error': "Assign Team failed", "detail": ser.errors})


class DeleteTeam(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):
        data = request.data
        team_id = data['Team_id']

        team_obj = models.Team.objects.filter(id=team_id).first()

        context = {"code": 403, "status": False, "detail": "Fail to delete"}

        if team_obj:
            team_obj.delete()
            context = {"code": 200, "status": True, "detail": "Has been deleted"}

        return Response(context)


class DeleteAllYearTwo(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):
        grad_obj = models.Graduate.objects.filter(year=2).all()

        grad_obj.delete()

        context = {"code": 200, "status": True, "detail": "Has been deleted"}

        return Response(context)


class ChangeGraduateYear(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):
        ser = serializers.ChangeGraduateYear(data=request.data, many=True)

        if ser.is_valid():
            ser.save()
            return Response({"code": 200, "status": True,
                             "detail": "Has been Changed", "data": ser.data})

        return Response({"code": 403, "status": False, "detail": "Fail to delete"})


class BatchRegister(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):

        # Get Email List and role
        email_list = request.data['email']
        role = request.data['role']

        # Generating a registration list
        registration_list = []

        for email in email_list:
            email_dic = {"email": email, "role": role}

            registration_list.append(email_dic)

        # Check that Role conforms
        ser_role = serializers.RoleSerializer(data=request.data)

        if not ser_role.is_valid():
            return Response({"code": 403, "status": False, "detail": "Fail to delete"})

        ser = serializers.AddRegistrations(data=registration_list, many=True)

        if ser.is_valid():
            ser.save()
        else:
            return Response({"code": 403, "status": False,
                             'error': "Failed to add", "detail": ser.errors})

        for email in email_list:
            email_obj = models.Registration.objects.filter(email=email).first()

            # Generate tokens
            token_id = str(email_obj.id)
            token = hashEncryption(token_id)

            email_obj.token = token
            email_obj.save()

            # send the email

            register_url = '127.0.0.1:5173/sign_up/' + token

            send_mail(
                subject='Registration link',
                message='Here is your Register link : ' + register_url,
                from_email='wenda76629@vip.163.com',
                recipient_list=[email],
                fail_silently=False
            )

        return Response({"code": 200, "status": True,
                         "detail": "Email has been Send", "data": ser.data})


class ResetPasswordByEmail(APIView):
    authentication_classes = []

    def post(self, request):
        # Get Email List and role
        email = request.data['email']

        # Find the User
        manger_object = models.Manager.objects.filter(email=email).first()
        hr_object = models.HR.objects.filter(email=email).first()
        grad_object = models.Graduate.objects.filter(email=email).first()

        user_obj = False
        if manger_object:
            user_obj = manger_object
            user_type = 'Manager'

        elif hr_object:
            user_obj = hr_object
            user_type = 'Hr'

        elif grad_object:
            user_obj = grad_object
            user_type = 'Graduate'

        if not user_obj:
            return Response({"code": 403, "status": False, 'error': "Please check the email"})

        # Generate tokens
        user_id = str(user_obj.id)
        token = hashEncryption(user_id)

        user_obj.token = token
        user_obj.save()

        # send the email
        register_url = '127.0.0.1:5173/sign_up/' + token

        send_mail(
            subject='Registration link',
            message='Here is your Register link : ' + register_url,
            from_email='wenda76629@vip.163.com',
            recipient_list=[email],
            fail_silently=False
        )

        return Response({"code": 200, 'status': True,
                         'user_type': user_type, 'Detail': "Email has been send"})

    def put(self, request):

        # Get the token
        token = request.data['token']

        pwd1 = request.data['pwd1']

        pwd2 = request.data['pwd2']

        # Check new password
        if pwd1 != pwd2:
            return Response({"code": 403, "status": False, 'error': "Please confirm your password"})

        # Hash the new password
        hash_pwd = hashEncryption(pwd2)

        # Generating updated information
        password_dic = {"password": hash_pwd}

        # Find the user

        manger_object = models.Manager.objects.filter(token=token).first()
        hr_object = models.HR.objects.filter(token=token).first()
        grad_object = models.Graduate.objects.filter(token=token).first()

        user_obj = False

        if manger_object:
            user_obj = manger_object
            user_type = 'Manager'

        elif hr_object:
            user_obj = hr_object
            user_type = 'Hr'

        elif grad_object:
            user_obj = grad_object
            user_type = 'Graduate'

        if not user_obj:
            return Response({"code": 403, "status": False, 'error': "Token incorrect"})

        # Check the password format
        ser = serializers.CheckPasswordFormat(data=password_dic)

        if ser.is_valid():
            user_obj.password = hash_pwd

            user_obj.token = None
            user_obj.save()

            return Response({"code": 200, 'status': True,
                             'user_type': user_type, 'Detail': "Password Changed"})

        return Response({"code": 403, "status": False,
                         'error': "Failed to add", "detail": ser.errors})
