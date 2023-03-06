from rest_framework import serializers
from Assign import models

from rest_framework import serializers
from rest_framework import exceptions


# Hr Info
class HrSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HR
        fields = ["first_name", "second_name", "email"]
        list_serializer_class = serializers.ListSerializer


# Graduate informations
class GradSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Graduate
        fields = ["first_name", "second_name", "email", "year"]
        list_serializer_class = serializers.ListSerializer


class ManSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Manager
        fields = ["first_name", "second_name", "email"]
        list_serializer_class = serializers.ListSerializer


class RoleSerializer(serializers.Serializer):
    role = serializers.IntegerField(required=True)

    def validate_role(self, value):
        if value < 1 or value > 3:
            raise exceptions.ValidationError("Field hook validation failed")
        return value


class CreateGraduateSerializer(serializers.ModelSerializer):
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
    Form_information = serializers.SerializerMethodField()
    Grad_id = serializers.SerializerMethodField()

    def get_Form_information(self, obj):
        grad_id = obj
        Form = models.Form.objects.filter(graduate=grad_id).all()
        return [
            {"Form_id": i.id, "Skill_id": i.skill_id.id, "skill_name": i.skill_id.skill_name, "Interest": i.interest,
             "Experience": i.experience}
            for i in Form]

    def get_Grad_id(self, obj):
        return obj.id

    class Meta:
        model = models.Form
        fields = ["Grad_id", "Form_information"]
        list_serializer_class = serializers.ListSerializer


class UpdateFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Form
        fields = ["interest", "experience", "skill_id", "graduate"]
        list_serializer_class = serializers.ListSerializer


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Skill
        fields = ["id", "skill_name"]
        list_serializer_class = serializers.ListSerializer


class TeamViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Graduate
        fields = ["email", "first_name", "second_name"]
        list_serializer_class = serializers.ListSerializer


class TeamSettingViewSerializer(serializers.ModelSerializer):
    Skill_information = serializers.SerializerMethodField()

    def get_Skill_information(self, obj):
        skill = obj.skill.all()
        return [
            {"Skill_id": i.id, "skill_name": i.skill_name, }
            for i in skill]

    class Meta:
        model = models.Team
        fields = ["team_name", "ratio", "Skill_information"]
        list_serializer_class = serializers.ListSerializer


class CreateTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        fields = ["team_name", "man_id", "depart_id", "ratio", "skill"]
        extra_kwargs = {
            "team_name": {"max_length": 100, "write_only": True},
        }


class UpdateTeamSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        fields = ["ratio", "skill"]


class AllTeamViewSerializer(serializers.ModelSerializer):
    information = serializers.SerializerMethodField()

    def get_information(self, obj):
        Man = obj.man_id
        Dep = obj.depart_id

        if Man and Dep:
            Message = {"Man_id": Man.id, "first_name": Man.first_name, "second_name": Man.second_name, "Dep_id": Dep.id,
                       "Dep_name": Dep.depart_name}
        elif Man:
            Message = {"Man_id": Man.id, "first_name": Man.first_name, "second_name": Man.second_name, "Dep_id": "NULL",
                       "Dep_name": "NULL"}
        elif Dep:
            Message = {"Man_id": "NULL", "first_name": "NULL", "second_name": "NULL", "Dep_id": Dep.id,
                       "Dep_name": Dep.depart_name}
        else:
            Message = {"Man_id": "Null,", "first_name": "Null", "second_name": "Null", "Dep_id": "Null,",
                       "Dep_name": "Null"}

        return Message

    class Meta:
        model = models.Team
        fields = ["team_name", "man_id", "information"]


class AllGradSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Graduate
        fields = ["id", "email", "first_name", "second_name"]


class AllManSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Graduate
        fields = ["id", "email", "first_name", "second_name"]


class AssignGraduate(serializers.ModelSerializer):
    class Meta:
        model = models.Graduate
        fields = ["team_id"]


class AssignManger(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        fields = ["man_id"]


class CreateDepartment(serializers.ModelSerializer):
    class Meta:
        model = models.Department
        fields = ["depart_name"]


class AssignTeamToDepartment(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        fields = ["depart_id"]


class ChangeGraduateYear(serializers.ModelSerializer):
    class Meta:
        model = models.Graduate
        fields = ["id", "year"]


class AddRegistrations(serializers.Serializer):
    email = serializers.CharField()
    role = serializers.IntegerField()

    def create(self, validated_data):
        mail = validated_data.get('email')
        role = validated_data.get('role')

        # Allow repeat registrations
        instance, created = models.Registration.objects.get_or_create(email=mail, role=role)

        return instance


class RegisterGraduate(serializers.ModelSerializer):
    class Meta:
        model = models.Graduate
        fields = ["email", 'password', 'first_name', 'second_name']


class RegisterManager(serializers.ModelSerializer):
    class Meta:
        model = models.Manager
        fields = ["email", 'password', 'first_name', 'second_name']


class CheckPasswordFormat(serializers.Serializer):
    password = serializers.CharField(max_length=64, validators=[
        lambda value: len(value) <= 64 or serializers.ValidationError("The password format is incorrect")
    ])
