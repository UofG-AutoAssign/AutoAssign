from rest_framework import serializers
from rest_framework import exceptions

from Assign import models


class HrSerializer(serializers.ModelSerializer):
    """
        Hr information
    """

    class Meta:
        model = models.HR
        fields = ["first_name", "second_name", "email"]
        list_serializer_class = serializers.ListSerializer


class GradSerializer(serializers.ModelSerializer):
    """
        Graduate information
    """

    class Meta:
        model = models.Graduate
        fields = ["first_name", "second_name", "email", "year"]
        list_serializer_class = serializers.ListSerializer


class ManSerializer(serializers.ModelSerializer):
    """
        Manger information
    """

    class Meta:
        model = models.Manager
        fields = ["first_name", "second_name", "email"]
        list_serializer_class = serializers.ListSerializer


# pylint: disable=W0223
class RoleSerializer(serializers.Serializer):
    """
        Check that the role value is in range
        Avoid external input of the wrong role value,
        avoid wrong operation of the database.
    """
    role = serializers.IntegerField(required=True)

    def validate_role(self, value):
        if value < 1 or value > 3:
            raise exceptions.ValidationError("Field hook validation failed")
        return value


class CreateGraduateSerializer(serializers.ModelSerializer):
    """
        Check that the role value is in range
        Avoid external input of the wrong role value,
        avoid wrong operation of the database.
    """

    class Meta:
        model = models.Graduate
        fields = ["role", "email", "password", "first_name", "second_name"]
        extra_kwargs = {
            "email": {"max_length": 100, "write_only": True},
            "password": {"max_length": 64, "write_only": True},
            "first_name": {"max_length": 30, "write_only": True},
            "second_name": {"max_length": 30, "write_only": True}
        }


class CreateMangerSerializer(serializers.ModelSerializer):
    """
        Check that the data that created the administrator is in the correct format
    """

    class Meta:
        model = models.Manager
        fields = ["role", "email", "password", "first_name", "second_name"]
        extra_kwargs = {
            "email": {"max_length": 100, "write_only": True},
            "password": {"max_length": 64, "write_only": True},
            "first_name": {"max_length": 30, "write_only": True},
            "second_name": {"max_length": 30, "write_only": True}
        }


class CreateHrSerializer(serializers.ModelSerializer):
    """
        Check that the data that created the Hr is in the correct format
    """

    class Meta:
        model = models.HR
        fields = ["role", "email", "password", "first_name", "second_name"]
        extra_kwargs = {
            "email": {"max_length": 100, "write_only": True},
            "password": {"max_length": 64, "write_only": True},
            "first_name": {"max_length": 30, "write_only": True},
            "second_name": {"max_length": 30, "write_only": True}
        }


class FormSerializer(serializers.ModelSerializer):
    """
        Get all the Form information of Graduate in batch
        and output in accordance with the format
    """
    form_information = serializers.SerializerMethodField()
    grad_id = serializers.SerializerMethodField()

    def get_form_information(self, obj):
        grad_obj = obj
        form = models.Form.objects.filter(graduate=grad_obj).all()
        return [
            {"Form_id": i.id, "Skill_id": i.skill_id.id,
             "skill_name": i.skill_id.skill_name, "Interest": i.interest,
             "Experience": i.experience}
            for i in form]

    def get_grad_id(self, obj):
        return obj.id

    class Meta:
        model = models.Form
        fields = ["grad_id", "form_information"]
        list_serializer_class = serializers.ListSerializer


class UpdateFormSerializer(serializers.ModelSerializer):
    """
        Update From information
    """

    class Meta:
        model = models.Form
        fields = ["interest", "experience", "skill_id", "graduate"]
        list_serializer_class = serializers.ListSerializer


class SkillSerializer(serializers.ModelSerializer):
    """
        Serialize the output Skill information
    """

    class Meta:
        model = models.Skill
        fields = ["id", "skill_name"]
        list_serializer_class = serializers.ListSerializer


class TeamViewSerializer(serializers.ModelSerializer):
    """
        Serialize the output Team information
    """

    class Meta:
        model = models.Graduate
        fields = ["email", "first_name", "second_name"]
        list_serializer_class = serializers.ListSerializer


class TeamSettingViewSerializer(serializers.ModelSerializer):
    """
        Serialize the output Team's Setting information
    """
    skill_information = serializers.SerializerMethodField()

    def get_skill_information(self, obj):
        skill = obj.skill.all()
        return [
            {"skill_id": i.id, "skill_name": i.skill_name, }
            for i in skill]

    class Meta:
        model = models.Team
        fields = ["team_name", "ratio", "skill_information"]
        list_serializer_class = serializers.ListSerializer


class CreateTeamSerializer(serializers.ModelSerializer):
    """
        Check that the data used to create the Team is formatted
    """

    class Meta:
        model = models.Team
        fields = ["team_name", "man_id", "depart_id", "ratio", "skill"]
        extra_kwargs = {
            "team_name": {"max_length": 100, "write_only": True},
        }


class UpdateTeamSettingSerializer(serializers.ModelSerializer):
    """
       Serialize the update group Settings
    """

    class Meta:
        model = models.Team
        fields = ["ratio", "skill"]


class AllTeamViewSerializer(serializers.ModelSerializer):
    """
       Serialization outputs all Team information
    """
    team_information = serializers.SerializerMethodField()
    team_id = serializers.SerializerMethodField()

    def get_team_information(self, obj):
        man = obj.man_id
        dep = obj.depart_id

        if man and dep:
            message = {"man_id": man.id, "man_email": man.email, "first_name": man.first_name,
                       "second_name": man.second_name, "dep_id": dep.id,
                       "Dep_name": dep.depart_name}
        elif man:
            message = {"man_id": man.id, "man_email": man.email, "first_name": man.first_name,
                       "second_name": man.second_name, "dep_id": "NULL",
                       "dep_name": "NULL"}
        elif dep:
            message = {"man_id": "NULL", "man_email": "NULL", "first_name": "NULL",
                       "second_name": "NULL", "Dep_id": dep.id,
                       "dep_name": dep.depart_name}
        else:
            message = {"man_id": "Null,", "man_email": "NULL", "first_name": "Null",
                       "second_name": "Null", "dep_id": "Null,",
                       "dep_name": "Null"}

        return message

    def get_team_id(self, obj):

        return obj.id

    class Meta:
        model = models.Team
        fields = ["team_name", "team_id", "team_information"]


class AllGradSerializer(serializers.ModelSerializer):
    """
       Serializes the output of all Graduate information
    """

    class Meta:
        model = models.Graduate
        fields = ["id", "email", "first_name", "second_name"]


class AllManSerializer(serializers.ModelSerializer):
    """
       Serializes the output of all Manager information
    """

    class Meta:
        model = models.Graduate
        fields = ["id", "email", "first_name", "second_name"]


class AllDepSerializer(serializers.ModelSerializer):
    """
       Serializes the output of all Department information
    """

    class Meta:
        model = models.Department
        fields = ["id", "depart_name"]


class AssignGraduate(serializers.ModelSerializer):
    """
       Assign Gradute into Team
    """

    class Meta:
        model = models.Graduate
        fields = ["team_id"]


class AssignManager(serializers.ModelSerializer):
    """
       Assign Manager into Team
    """

    class Meta:
        model = models.Team
        fields = ["man_id"]


class CreateDepartment(serializers.ModelSerializer):
    """
        Creating a new Department
    """

    class Meta:
        model = models.Department
        fields = ["depart_name"]


class AssignTeamToDepartment(serializers.ModelSerializer):
    """
        Assign Team into a department
    """

    class Meta:
        model = models.Team
        fields = ["depart_id"]


class ChangeGraduateYear(serializers.ModelSerializer):
    """
        Change the Graduate's Year
    """

    class Meta:
        model = models.Graduate
        fields = ["id", "year"]


class AddRegistrations(serializers.Serializer):
    """
        Enter the batch mailbox into the registration information,
        if there is already registration information, overwrite.
    """
    email = serializers.CharField()
    role = serializers.IntegerField()

    def create(self, validated_data):
        mail = validated_data.get('email')
        role = validated_data.get('role')

        # Allow repeat registrations
        instance, _ = models.Registration.objects.get_or_create(email=mail, role=role)

        return instance


class RegisterGraduate(serializers.ModelSerializer):
    """
        Check the Graduate registration information and register
    """

    class Meta:
        model = models.Graduate
        fields = ["email", 'password', 'first_name', 'second_name']


class RegisterManager(serializers.ModelSerializer):
    """
        Check the Manager registration information and register
    """

    class Meta:
        model = models.Manager
        fields = ["email", 'password', 'first_name', 'second_name']


class CheckPasswordFormat(serializers.Serializer):
    """
        Check the Password Format
    """
    password = serializers.CharField(max_length=64, validators=[
        lambda value: len(value) <= 64
                      or serializers.ValidationError("The password format is incorrect")
    ])


class CreateNewTeamSerializer(serializers.ModelSerializer):
    """
        Check that the data used to create the Team is formatted
    """

    class Meta:
        model = models.Team
        fields = ["team_name", "man_id", "depart_id", "num_positions"]
        extra_kwargs = {
            "team_name": {"max_length": 100, "write_only": True},
        }


class TeamAndDepartment(serializers.ModelSerializer):
    """
        Serialize the output Team's and Dep information
    """
    depart_name = serializers.SerializerMethodField()

    team_id = serializers.SerializerMethodField()

    man_name = serializers.SerializerMethodField()

    team_members = serializers.SerializerMethodField()

    man_email = serializers.SerializerMethodField()

    def get_depart_name(self, obj):
        dep_id = obj.depart_id

        if dep_id:
            return dep_id.depart_name

        return "Null"

    def get_team_id(self, obj):
        return obj.id

    def get_man_name(self, obj):

        man_id = obj.man_id

        if man_id:
            return man_id.first_name + " " + man_id.second_name

        return "Null"

    def get_man_email(self, obj):

        man_id = obj.man_id

        if man_id:
            return man_id.email

        return "Null"

    def get_team_members(self, obj):

        grad_obj = models.Graduate.objects.filter(team_id=obj.id).all()

        if grad_obj:
            return [
                {"grad_id": i.id,
                 "grad_name": i.first_name + " " + i.second_name, "grad_email": i.email}
                for i in grad_obj]

        return "Null"

    class Meta:
        model = models.Team
        fields = ["team_name", "team_id", "depart_name",
                  "depart_id", "man_id", "man_name", "man_email", "team_members", "num_positions"]
        list_serializer_class = serializers.ListSerializer
