from django.urls import path, re_path
from Assign import views


app_name = 'Assign'




urlpatterns = [
    path('', views.LoginView.as_view()),     # CBV Style

]