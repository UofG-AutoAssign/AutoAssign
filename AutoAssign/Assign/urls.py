from django.urls import path, re_path
from Assign import views

app_name = 'Assign'

urlpatterns = [
    path('', views.LoginView.as_view(), name="Login"),  # CBV Style Login
    path('home/hr/', views.HrView.as_view(), name="HrHome"),
    path('home/hr/CreateTeam', views.CreateTeamView.as_view(), name="CreateTeam"),
    path('home/grad/', views.GradView.as_view(), name="GradHome"),
    path('home/grad/Form', views.FormView.as_view(), name="FromDisplay"),
    path('home/man/', views.ManView.as_view(), name="ManHome"),
    path('home/man/Team', views.TeamMemberView.as_view(), name="TeamMemberView"),
    path('home/man/Team/Setting', views.TeamSettingView.as_view(), name="TeamSettingView"),
    path('home/man/Team/UpdateSetting', views.UpdateTeamSetting.as_view(), name="UpdateTeamSetting"),
    path('home/hr/create', views.HrViewCreate.as_view(), name="HrCreate"),
    path('home/hr/TeamView', views.AllTeamView.as_view(), name="AllTeam"),
    path('home/hr/GradView', views.AllGradView.as_view(), name="AllGrad"),
    path('home/skill', views.SkillView.as_view(), name="skill"),
    path('home/ChangePassword', views.ChangePassword.as_view(), name="ChangePassWord"),


]
