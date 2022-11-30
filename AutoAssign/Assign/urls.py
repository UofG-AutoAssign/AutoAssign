from django.urls import path, re_path
from Assign import views

app_name = 'Assign'

urlpatterns = [
    path('', views.LoginView.as_view(), name="Login"),  # CBV Style Login
    path('home/hr/', views.HrView.as_view(), name="HrHome"),
    path('home/grad/', views.GradView.as_view(), name="GradHome"),
    path('home/man/', views.ManView.as_view(), name="ManHome"),
    path('home/hr/create', views.HrViewCreate.as_view(), name="HrCreate"),
]
