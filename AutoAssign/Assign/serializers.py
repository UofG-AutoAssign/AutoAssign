from rest_framework import serializers
from Assign import models

from rest_framework import serializers
from rest_framework import exceptions


# Hr Info
class HrSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HR
        fields = ["first_name", "second_name", "hr_email"]
        list_serializer_class = serializers.ListSerializer


class RoleSerializer(serializers.Serializer):
    role = serializers.IntegerField(required=True)

    def validate_role(self, value):
        if value < 1 or value > 3:
            raise exceptions.ValidationError("Field hook validation failed")
        return value


class CreatGraduateSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Graduate
        fields = ["role", "email", "password", "first_name", "second_name"]
        extra_kwargs = {
            "email": {"max_length": 100, "write_only": True},
            "password": {"max_length": 64, "write_only": True},
            "first_name": {"max_length": 30, "write_only": True},
            "second_name": {"max_length": 30, "write_only": True}
        }


class CreatMangerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Manager
        fields = ["role", "email", "password", "first_name", "second_name"]
        extra_kwargs = {
            "email": {"max_length": 100, "write_only": True},
            "password": {"max_length": 64, "write_only": True},
            "first_name": {"max_length": 30, "write_only": True},
            "second_name": {"max_length": 30, "write_only": True}
        }


class CreatHrSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HR
        fields = ["role", "email", "password", "first_name", "second_name"]
        extra_kwargs = {
            "email": {"max_length": 100, "write_only": True},
            "password": {"max_length": 64, "write_only": True},
            "first_name": {"max_length": 30, "write_only": True},
            "second_name": {"max_length": 30, "write_only": True}
        }

# Basic method: hook verification
# class HrCreatSerializer(serializers.Serializer):
#     role = serializers.IntegerField(required=True)
#
#     email = serializers.CharField(required=True, max_length=100)
#
#     password = serializers.CharField(required=True, max_length=64)
#
#     first_name = serializers.CharField(required=True, max_length=30)
#
#     second_name = serializers.CharField(required=True, max_length=30)
#
#     # Hook check
#     def validate_email(self, value):
#         if len(value) > 100:
#             raise exceptions.ValidationError("Field hook validation failed")
#         return value
#
#     def validate_role(self, value):
#         if value < 1 or value > 3:
#             raise exceptions.ValidationError("Field hook validation failed")
#         return value
#
#     def validate_password(self, value):
#         if len(value) > 64:
#             raise exceptions.ValidationError("Field hook validation failed")
#         return value
#
#     def validate_first_name(self, value):
#         if len(value) > 30:
#             raise exceptions.ValidationError("Field hook validation failed")
#         return value
#
#     def validate_second_name(self, value):
#         if len(value) > 30:
#             raise exceptions.ValidationError("Field hook validation failed")
#         return value
