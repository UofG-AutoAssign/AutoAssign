from django.shortcuts import render, HttpResponse
from rest_framework import generics , status
from Assign import serializer
from Assign import models
from rest_framework.views import APIView
from rest_framework.response import  Response



# Create your views here.
