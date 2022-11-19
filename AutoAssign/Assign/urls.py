from django.urls import path, re_path
from rest_framework.routers import DefaultRouter
from Assign import views


app_name = 'Assign'

router = DefaultRouter()
router.register(r'Graduate', views.GraduateSet, basename='Graduate')
urlpatterns = router.urls