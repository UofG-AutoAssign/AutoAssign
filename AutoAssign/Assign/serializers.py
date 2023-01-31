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


class GradSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Graduate
        fields = ["first_name", "second_name", "email"]
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

    def get_Form_information(self, obj):
        Form = obj.Form.all()
        return [
            {"Form_id": i.id, "skill_name": i.Skill_id.skill_name, "Interest": i.interest, "Experience": i.experience}
            for i in Form]

    class Meta:
        model = models.Form
        fields = ["id", "Form_information"]
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
        Skill = obj.Skill.all()
        return [
            {"Skill_id": i.id, "skill_name": i.skill_name, }
            for i in Skill]

    class Meta:
        model = models.Team
        fields = ["team_name", "ratio", "Skill_information"]
        list_serializer_class = serializers.ListSerializer
