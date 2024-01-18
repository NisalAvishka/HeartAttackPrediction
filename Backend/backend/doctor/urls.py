# urls.py

from django.urls import path
from .views import get_doctors, get_users, get_doctor_profile, change_doctor_profile

urlpatterns = [
    path('get_doctors/', get_doctors, name='get_doctors'),
    path('get_users/', get_users, name='get_users'),
    path('get_doctor_profile/<int:uid>/', get_doctor_profile, name='get_doctor_profile'),
    path('change_doctor_profile/', change_doctor_profile, name='change_doctor_profile'),
]
