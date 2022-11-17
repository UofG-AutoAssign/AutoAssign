from django.urls import path, re_path
from Assign import views

app_name = 'Assign'

urlpatterns = [
    path('', views.login),
    path('forget/', views.forget),
    path('create/', views.create),
    path('home/', views.home),
    path('home/hr', views.home_hr),
    path('home/hr/manage', views.home_hr_manage),
    path('home/manager', views.home_manager),
    path('home/graduate', views.home_graduate),
    path('home/graduate/form', views.home_graduate_form),
    path('home/graduate/roles', views.home_graduate_roles),
    path('home/account', views.home_account),
]