from django.urls import path, re_path
from Assign import views

app_name = 'Assign'

urlpatterns = [
    path('', views.LoginView.as_view(), name="Login"),  # CBV Style Login
    path('home/register/', views.Register.as_view(), name="Register"),
    path('home/reset/', views.ResetPasswordByEmail.as_view(), name="ResetPasswordByEmail"),
    path('home/grad/', views.GradView.as_view(), name="GradHome"),
    path('home/grad/form/', views.FormView.as_view(), name="FromDisplay"),
    path('home/grad/team/', views.ViewGradTeamInfo.as_view(), name="ViewTeamInformation"),
    path('home/man/', views.ManView.as_view(), name="ManHome"),
    path('home/man/Team/', views.TeamMemberView.as_view(), name="TeamMemberView"),
    path('home/man/Team/setting/', views.TeamSettingView.as_view(), name="TeamSettingView"),
    path('home/man/Team/UpdateSetting/', views.TeamSettingView.as_view(), name="UpdateTeamSetting"),
    path('home/hr/', views.HrView.as_view(), name="HrHome"),
    path('home/hr/create/', views.HrViewCreate.as_view(), name="HrCreate"),
    path('home/hr/CreateTeam/', views.CrateTeam.as_view(), name="CreateTeam"),
    path('home/hr/TeamView/', views.AllTeamView.as_view(), name="AllTeam"),
    path('home/hr/GradView/', views.AllGradView.as_view(), name="AllGrad"),
    path('home/hr/DepartmentView/', views.AllDepartmentView.as_view(), name="Department"),
    path('home/hr/AllYearTwoGrad/', views. AllYearTwoGrad.as_view(), name="AllYearTwoGrad"),
    path('home/hr/UnGradView/', views.AllUnGradView.as_view(), name="AllUnAssignGrad"),
    path('home/hr/UnManView/', views.AllUnManView.as_view(), name="AllUnAssignMan"),
    path('home/hr/DeleteGrad/', views.DeleteGrad.as_view(), name="DeleteGrad"),
    path('home/hr/ChangeGraduateYear/', views.ChangeGraduateYear.as_view(), name="ChangeGraduateYear"),
    path('home/hr/ManView/', views.AllManView.as_view(), name="AllMan"),
    path('home/hr/DeleteMan/', views.DeleteMan.as_view(), name="DeleteManger"),
    path('home/hr/AssignGrad/', views.AssignGradToTeam.as_view(), name="AssignGrad"),
    path('home/hr/AssignMan/', views.AssignManToTeam.as_view(), name="AssignMan"),
    path('home/hr/CreateDepartment/', views.CreateDepartment.as_view(), name="CreateDepartment"),
    path('home/hr/AssignTeam/', views.AssignTeamToDepartment.as_view(), name="AssignTeamToDepartment"),
    path('home/hr/DeleteTeam/', views.DeleteTeam.as_view(), name="DeleteTeam"),
    path('home/hr/AddTeam/', views.BatchRegister.as_view(), name="Register"),
    path('home/hr/Register/', views.BatchRegister.as_view(), name="Register"),
    path('home/hr/DeleteYearTwo/', views.DeleteAllYearTwo.as_view(), name="DeleteYearTwo"),
    path('home/hr/DeleteYearTwo/', views.DeleteAllYearTwo.as_view(), name="DeleteYearTwo"),
    path('home/skill/', views.SkillView.as_view(), name="skill"),
    path('home/ChangePassword/', views.ChangePassword.as_view(), name="ChangePassWord"),


]
