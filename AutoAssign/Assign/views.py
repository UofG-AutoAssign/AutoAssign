from django.shortcuts import render, HttpResponse
from rest_framework import generics , status,viewsets
from Assign import serializer
from Assign import models
from rest_framework.views import APIView
from rest_framework.response import  Response
from django.shortcuts import render



# Create your views here.

class GraduateSet(viewsets.ModelViewSet):
    serializer_class = serializer.GraduateSerializer
    queryset = models.Graduate.objects.all()


