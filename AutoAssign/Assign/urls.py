from django.urls import path, re_path
from Assign import views


app_name = 'Assign'

urlpatterns = [
    path('', views.LoginView.as_view()),     # CBV Style Login
    path('home/hr/', views.HrView.as_view()),
    path('home/grad/', views.GradView.as_view()),
    path('home/man/', views.ManView.as_view()),
    path('home/hr/creat', views.HrViewCreat.as_view()),
]