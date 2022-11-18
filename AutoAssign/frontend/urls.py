from django.urls import path, re_path
from frontend import views

app_name = 'frontend'

urlpatterns = [
    path('', views.login, name='login'),
    path('forget/', views.forget, name='forget'),
    path('create/', views.create, name='create'),
    path('home/', views.home, name='home'),
    path('home/hr', views.home_hr, name='home_hr'),
    path('home/hr/manage', views.home_hr_manage, name='home_hr_manage'),
    path('home/manager', views.home_manager, name='home_manager'),
    path('home/graduate', views.home_graduate, name='home_graduate'),
    path('home/graduate/form', views.home_graduate_form, name='home_graduate_form'),
    path('home/graduate/roles', views.home_graduate_roles, name='home_graduate_roles'),
    path('home/account', views.home_account, name='home_account'),
]
