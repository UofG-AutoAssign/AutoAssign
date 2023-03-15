# pylint: disable=C0302
from rest_framework.views import APIView
from rest_framework.response import Response

from django.core.mail import send_mail

from ext.per import HrPermission, ManagerPermission, GradPermission
from ext.jwt_auth import create_token
from ext.encryption import Encryption

from Assign import serializers
from Assign import models

from Assign import alg


# Create your views here.

class LoginView(APIView):
    authentication_classes = []

    def post(self, request):
        # 1.Receive username and password submitted by user POST
        # print(request.query_params)
        user = request.data.get("username")
        pwd = request.data.get("password")

        if not user or pwd:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

        # Test
        # print(request.data)

        # 2.database validation

        # Hash Password and validation
        hash_pwd = Encryption.hash_encryption(pwd)

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

        token = request.data.get('token')

        pwd1 = request.data.get('pwd1')

        pwd2 = request.data.get('pwd1')

        if not token or not pwd1 or not pwd2:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

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
        hash_pwd = Encryption.hash_encryption(pwd2)

        # Generating a register data

        first_name = request.data.get('first_name')
        second_name = request.data.get('second_name')

        if not first_name or not second_name:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

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
        # Retrieve the user's information and serialize it using the HrSerializer
        ser = serializers.HrSerializer(instance=request.user)

        # Create a dictionary containing the response data
        context = {"code": 200, "status": True, "data": ser.data}

        # Return a response with the context data
        return Response(context)

    def put(self, request):
        # Update the user's information with the data provided in the request
        ser = serializers.HrSerializer(instance=request.user, data=request.data)

        # If the serializer is valid, save the updated information and create a response
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
        # Retrieve the user's information and serialize it using the GradSerializer
        ser = serializers.GradSerializer(instance=request.user)

        # Create a dictionary containing the response data
        context = {"code": 200, "status": True, "data": ser.data}

        # Return a response with the context data
        return Response(context)

    def put(self, request):
        # Update the user's information with the data provided in the request
        ser = serializers.GradSerializer(instance=request.user, data=request.data)

        # If the serializer is valid, save the updated information and create a response
        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True,
                       "Grad_id": request.user.id, "data": ser.data}
            return Response(context)

        # If the serializer is not valid, create a response with an error message and details
        return Response(
            {"code": 403, "status": False,
             'error': "Update personal information Fail", "detail": ser.errors})


class ViewGradTeamInfo(APIView):
    permission_classes = [GradPermission, ]

    def get(self, request):
        # Retrieve the current graduate's object
        grad_obj = request.user

        # Retrieve the current graduate's team object, if it exists
        team_obj = grad_obj.team_id

        # If the current graduate has a team,
        # retrieve all graduates on the team and serialize the data
        if team_obj:
            ser = serializers.TeamViewSerializer(instance=team_obj)

            # Create a dictionary containing the response data
            context = {"code": 200, "status": True, "data": ser.data}

            # Return a response with the context data
            return Response(context)

        # If the current graduate does not have a team, return an error response
        return Response({"code": 403, "status": False,
                         'error': "This Graduate dose not has a team yet"})


class ManView(APIView):
    permission_classes = [ManagerPermission, ]

    def get(self, request):
        # Retrieve the user's information and serialize it using the ManSerializer
        ser = serializers.ManSerializer(instance=request.user)

        # Create a dictionary containing the response data
        context = {"code": 200, "status": True, "data": ser.data}

        # Return a response with the context data
        return Response(context)

    def put(self, request):
        # Update the user's information with the data provided in the request
        ser = serializers.ManSerializer(instance=request.user, data=request.data)

        # If the serializer is valid, save the updated information and create a response
        if ser.is_valid():
            ser.save()
            context = {"code": 200, "status": True, "Man_id": request.user.id, "data": ser.data}
            return Response(context)

        # If the serializer is not valid, create a response with an error message and details
        return Response(
            {"code": 403, "status": False,
             'error': "Update personal information Fail", "detail": ser.errors})


class HrViewCreate(APIView):
    permission_classes = [HrPermission, ]

    # 1.Get initial data
    def post(self, request):

        # Check that the request data is in the correct format
        ser_role = serializers.RoleSerializer(data=request.data)

        # If the data is valid,
        # retrieve the role type from the serializer and hash the user's password
        if ser_role.is_valid():
            role = ser_role.validated_data["role"]

            # Hashing encryption requires the stored password
            hash_pwd = Encryption.hash_encryption(request.data.get('password'))
            request.data['password'] = hash_pwd

            if not hash_pwd:
                return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

        # Based on the role type, serialize the request data
        # using the appropriate serializer and create a response
        if role == 1:
            ser = serializers.CreateGraduateSerializer(data=request.data)
            context = {"code": 200, "status": True, "Create": "Graduate", "Status": "success"}
        elif role == 2:
            ser = serializers.CreateMangerSerializer(data=request.data)
            context = {"code": 200, "status": True, "Create": "Manager", "Status": "success"}
        elif role == 3:
            ser = serializers.CreateHrSerializer(data=request.data)
            context = {"code": 200, "status": True, "Create": "Hr", "Status": "success"}

        # If the serializer is valid, save the data and return a response indicating success
        if ser.is_valid():
            ser.save()
            return Response(context)

        # If the serializer is not valid, return an error response
        return Response({"code": 403, "status": False,
                         'error': "registration failed", "detail": ser.errors})


class SkillView(APIView):

    # Retrieve a list of all available skills
    def get(self, request):
        # Retrieve all Skill objects from the database and serialize them using the SkillSerializer
        skill_queryset = models.Skill.objects.all()

        ser = serializers.SkillSerializer(instance=skill_queryset, many=True)

        # Create a dictionary containing the response data
        context = {"code": 200, "status": True, "data": ser.data}

        # Return a response with the context data
        return Response(context)


class ChangePassword(APIView):

    # Process a PUT request to change the user's password
    def put(self, request):
        # Retrieve the user's current password, new password,
        # and confirmation password from the request data
        pwd = request.data.get("pwd")
        pwd1 = request.data.get("pwd1")
        pwd2 = request.data.get("pwd2")

        # Retrieve the current user object
        user = request.user

        # Hash the user's current password and check that it matches the stored password
        hash_pwd = Encryption.hash_encryption(pwd)

        # If the new password and confirmation password do not match, return an error response
        if pwd1 != pwd2:
            return Response({"code": 400,
                             'error': "Please check whether the passwords entered are consistent"})

        if hash_pwd != user.password:
            return Response({"code": 403, "status": False, 'error': 'password error'})

        # Hash the new password and update the user object with the new password
        hash_pwd = Encryption.hash_encryption(pwd1)
        user.password = hash_pwd
        user.save()

        context = {"code": 200, "status": True, "data": "Password Changed"}

        return Response(context)


class FormView(APIView):
    permission_classes = [GradPermission, ]

    # Retrieve the current graduate's form data
    def get(self, request):
        ser = serializers.FormSerializer(instance=request.user)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)

    # Process a POST request to update the current graduate's form data
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
        # Retrieve the current user and their team object
        user_obj = request.user
        team_obj = models.Team.objects.filter(man_id=user_obj).first()

        # If the current user has a team, retrieve all graduate members of the team
        # and serialize them using TeamViewSerializer
        if team_obj:
            ser = serializers.TeamViewSerializer(instance=team_obj)
            # Create a dictionary containing the response data
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
        # Retrieve all Team objects from the database
        # and serialize them using the AllTeamViewSerializer
        team_obj = models.Team.objects.filter().all()

        ser = serializers.AllTeamViewSerializer(instance=team_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class AllGradView(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        # Retrieve all Graduate objects from the database
        # and serialize them using the AllGradSerializer
        grad_obj = models.Graduate.objects.filter().all()

        ser = serializers.AllGradSerializer(instance=grad_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class AllManView(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        # Retrieve all Manager objects from the database
        # and serialize them using the AllManSerializer
        man_obj = models.Manager.objects.filter().all()

        ser = serializers.AllManSerializer(instance=man_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class DeleteMan(APIView):
    permission_classes = [HrPermission, ]

    # Process a POST request to delete a manager
    def post(self, request):
        # Retrieve the ID of the manager to be deleted from the request data
        man_id = request.data.get('id')

        if not man_id:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

        # Retrieve the Manager object with the specified ID
        man_obj = models.Manager.objects.filter(id=man_id).first()

        # Create a default response context indicating that the deletion failed
        context = {"code": 403, "status": False, "detail": "Fail to delete"}

        # If a Manager object with the specified ID was found,
        # delete it and create a success response context
        if man_obj:
            man_obj.delete()
            context = {"code": 200, "status": True, "detail": "Has been deleted"}

        return Response(context)


class DeleteGrad(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):
        # Retrieve the ID of the graduate to be deleted from the request dataa
        grad_id = request.data.get('id')

        if not grad_id:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

        # Retrieve the Graduate object with the specified ID
        grad_obj = models.Graduate.objects.filter(id=grad_id).first()

        context = {"code": 403, "status": False, "detail": "Fail to delete"}

        # If a Graduate object with the specified ID was found,
        # delete it and create a success response context
        if grad_obj:
            grad_obj.delete()
            context = {"code": 200, "status": True, "detail": "Has been deleted"}

        return Response(context)


class AssignGradToTeam(APIView):
    permission_classes = [HrPermission, ]

    def put(self, request):
        # Retrieve the graduate ID and team ID from the request data

        grad_id = request.data.get('grad_id')
        team_id = request.data.get('team_id')

        if not grad_id or team_id:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

        # Retrieve the Graduate and Team objects with the specified IDs
        grad_obj = models.Graduate.objects.filter(id=grad_id).first()
        team_obj = models.Team.objects.filter(id=team_id).first()

        # Check Team Capacity
        num_graduates = models.Graduate.objects.filter(team_id=team_obj).count()
        max_capacity = team_obj.num_positions

        if num_graduates + 1 > max_capacity:
            return Response(
                {"code": 403, "status": False,
                 'error': "Assign Grad failed", "detail": "The team is full"})

        # If either the Graduate or Team object was not found, return an error response
        if not grad_obj:
            return Response(
                {"code": 403, "status": False,
                 'error': "Assign Grad failed", "detail": "Please Check Graduate"})

        if not team_obj:
            return Response(
                {"code": 403, "status": False,
                 'error': "Assign Team failed", "detail": "Please Check Team"})

        # Serialize the request data and update
        # the Graduate object with the new team assignment
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

        man_id = request.data.get('man_id')
        team_id = request.data.get('team_id')

        if not man_id or team_id:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

        man_obj = models.Manager.objects.filter(id=man_id).first()
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

        depart_id = request.data.get('depart_id')
        team_id = request.data.get('team_id')

        if not depart_id or team_id:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

        depart_obj = models.Department.objects.filter(id=depart_id).first()
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
        team_id = request.data.load('Team_id')

        if not team_id:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

        team_obj = models.Team.objects.filter(id=team_id).first()

        context = {"code": 403, "status": False, "detail": "Fail to delete"}

        if team_obj:
            team_obj.delete()
            context = {"code": 200, "status": True, "detail": "Has been deleted"}

        return Response(context)


class DeleteAllYearTwo(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):
        check_num = request.data.load('check_num')

        if not check_num:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

        if check_num != 1:
            context = {"code": 200, "status": False, "detail": "Fail to delete"}

            return Response(context)

        grad_obj = models.Graduate.objects.filter(year=2).all()

        grad_obj.delete()

        context = {"code": 200, "status": True, "detail": "Has been deleted"}

        return Response(context)


class ChangeGraduateYear(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):

        data = request.data

        for grad in data:
            grad_id = grad.load("grad_id")
            grad_year = grad.load("year")

            if not grad_id or grad_year:
                return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

            grad_obj = models.Graduate.objects.filter(id=grad_id).first()
            if grad_year < 1 or grad_year > 2:
                return Response({"code": 403, "status": False, "detail": "Please Check year"})
            if not grad_obj:
                return Response({"code": 403, "status": False, "detail": "grad_id wrong"})

        for grad in data:
            grad_id = grad.load("grad_id")
            grad_year = grad.load("year")

            if not grad_id or grad_year:
                return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

            grad_obj = models.Graduate.objects.filter(id=grad_id).first()

            grad_obj.year = grad_year
            grad_obj.save()

        return Response({"code": 200, "status": True, "detail": "Has been Changed "})


class BatchRegister(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):

        # Get Email List and role
        email_list = request.data.load('email')
        role = request.data.load('role')
        url = request.data.load('url')

        if not email_list or role or url:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})

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
            token = Encryption.hash_encryption(token_id)

            email_obj.token = token
            email_obj.save()

            # send the email

            register_url = url + token

            send_mail(
                subject='Registration link from AutoAssign',
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
        email = request.data.load('email')
        url = request.data.load('url')

        if not email or url:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})        

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
        token = Encryption.hash_encryption(user_id)

        user_obj.token = token
        user_obj.save()

        # send the email
        register_url = url + token

        send_mail(
            subject='Registration link from AutoAssign',
            message='Here is your Register link : ' + register_url,
            from_email='wenda76629@vip.163.com',
            recipient_list=[email],
            fail_silently=False
        )

        return Response({"code": 200, 'status': True,
                         'user_type': user_type, 'Detail': "Email has been send"})

    def put(self, request):

        # Get the token
        token = request.data.load('token')

        pwd1 =  request.data.load('pwd1')

        pwd2 =  request.data.load('pwd2')

        if not token or pwd1 or pwd2:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})       

        # Check new password
        if pwd1 != pwd2:
            return Response({"code": 403, "status": False, 'error': "Please confirm your password"})

        # Hash the new password
        hash_pwd = Encryption.hash_encryption(pwd2)

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


class AllUnGradView(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        grad_obj = models.Graduate.objects.filter(team_id=None).all()

        ser = serializers.AllGradSerializer(instance=grad_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class AllUnManView(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        man_obj = models.Manager.objects.filter(team__isnull=True).all()

        ser = serializers.AllManSerializer(instance=man_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class AllYearTwoGrad(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        grad_obj = models.Graduate.objects.filter(year=2).all()

        ser = serializers.AllGradSerializer(instance=grad_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class CrateTeam(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):
        data_list = request.data
        for data in data_list:
            capacity = data.get("num_positions")

            if not capacity:
                return Response({"code": 406, "status": False, 'error': "Please check your parameters"})       

            if 7 < capacity < 1:
                return Response({"code": 403, "status": False, 'error': "Please Check Capacity "})

        ser = serializers.CreateNewTeamSerializer(data=request.data, many=True)

        if ser.is_valid():
            ser.save()

            context = {"code": 200, "status": True, "data": ser.data}
            return Response(context)

        return Response({"code": 403, "status": False, 'error': ser.errors})


class AllDepartmentView(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        dep_obj = models.Department.objects.filter().all()

        ser = serializers.AllDepSerializer(instance=dep_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class DeleteDepartment(APIView):
    permission_classes = [HrPermission, ]

    def post(self, request):
        dep_id = request.data.get('dep_id')

        if not dep_id:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})       

        dep_obj = models.Department.objects.filter(id=dep_id).first()

        context = {"code": 403, "status": False, "detail": "Fail to delete"}

        if dep_obj:
            dep_obj.delete()
            context = {"code": 200, "status": True, "detail": "Has been deleted"}

        return Response(context)


class TeamAndDepartment(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        team_obj = models.Team.objects.filter().all()

        ser = serializers.TeamAndDepartment(instance=team_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class AllYearOneGrad(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        grad_obj = models.Graduate.objects.filter(year=1).all()

        ser = serializers.AllGradSerializer(instance=grad_obj, many=True)

        context = {"code": 200, "status": True, "data": ser.data}

        return Response(context)


class AutoAssignAlg(APIView):
    permission_classes = [HrPermission, ]

    def get(self, request):
        team_objs = models.Team.objects.all()

        max_capacity = 0

        for team_obj in team_objs:
            max_capacity = max_capacity + team_obj.num_positions

        for team_obj in team_objs:
            skill_obj = team_obj.skill.all()
            ratio = team_obj.ratio

            if not skill_obj or not ratio:
                context = {"code": 200, "status": True,
                           "status_code": 0,
                           "max_capacity": max_capacity,
                           "detail": "There are team that have not completed the setup."}

                return Response(context)

        context = {"code": 200, "status": True,
                   "status_code": 1,
                   "max_capacity": max_capacity,
                   "detail": "Teams are ready to AutoAssign."}

        return Response(context)

    def post(self, request):

        check_num = request.data.get('check_num')

        if not check_num:
            return Response({"code": 406, "status": False, 'error': "Please check your parameters"})       

        if check_num != 1:
            context = {"code": 200, "status": False, "detail": "Fail to delete"}

            return Response(context)

        alg.assign_graduates_to_teams()

        context = {"code": 200, "status": True, "detail": "Has been Assign"}

        return Response(context)
