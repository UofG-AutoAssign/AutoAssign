from rest_framework import serializers
from Assign import models

from rest_framework import serializers

#Test

class HrSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.HR
        fields = ["first_name", "second_name", "hr_email"]
        list_serializer_class = serializers.ListSerializer

