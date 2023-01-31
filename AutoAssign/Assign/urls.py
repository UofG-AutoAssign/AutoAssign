from django.urls import path, re_path
from Assign import views

app_name = 'Assign'

urlpatterns = [
    path('', views.LoginView.as_view(), name="Login"),  # CBV Style Login
    path('home/hr/', views.HrView.as_view(), name="HrHome"),
    path('home/grad/', views.GradView.as_view(), name="GradHome"),
    path('home/grad/Form', views.FormView.as_view(), name="FromDisplay"),
    path('home/man/', views.ManView.as_view(), name="ManHome"),
    path('home/man/Team', views.TeamView.as_view(), name="TeamMemberView"),
    path('home/hr/create', views.HrViewCreate.as_view(), name="HrCreate"),
    path('home/skill', views.SkillView.as_view(), name="skill"),
    path('home/ChangePassword', views.ChangePassword.as_view(), name="ChangePassWord"),


]
