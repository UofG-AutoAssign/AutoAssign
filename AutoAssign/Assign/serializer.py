from rest_framework import serializers
from Assign import models

#Test

class GraduateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Graduate
        fields = '__all__'




