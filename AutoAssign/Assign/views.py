from django.shortcuts import render, HttpResponse


# Create your views here.

#This is for login Page
def login(request):
    return HttpResponse("This is login page which is the first page")

def forget(request):
    return HttpResponse("This is forget password page")

def create(request):
    return HttpResponse("This is create account page")


#  This is for Home Page
def home(request):
    return HttpResponse("This is home pages")

def home_hr(request):
    return HttpResponse("This is home_hr pages")

def home_hr_manage(request):
    return HttpResponse("This is home_hr_manage")

def home_manager(request):
    return HttpResponse("This is home_manager pages")


def home_graduate(request):
    return HttpResponse("This is home_graduate pages")

def home_graduate_form(request):
    return HttpResponse("This is home_graduate_form pages")

def home_graduate_roles(request):
    return HttpResponse("This is home_graduate_roles pages")

#account page for all type users
def home_account(request):
    return HttpResponse("This is account page")