from django.urls import path
from .views import (user_appointment, get_user_appointment, delete_user_appointment, get_admin_appointments,
                    update_admin_appointments, get_doctor_appointments, update_appointment, count_prediction)

urlpatterns = [
    path('user_appointment/', user_appointment, name='user_appointment'),
    path('get_user_appointment/<int:user_id>/', get_user_appointment, name='get_user_appointment'),
    path('delete_user_appointment/<int:appointment_id>/', delete_user_appointment, name='delete_user_appointment'),
    path('get_admin_appointments/', get_admin_appointments, name='get_admin_appointments'),
    path('update_admin_appointments/', update_admin_appointments, name='update_admin_appointments'),
    path('get_doctor_appointments/<int:user_id>/', get_doctor_appointments, name='get_doctor_appointments'),
    path('update_appointment/', update_appointment, name='update_appointment'),
    path('count_prediction/', count_prediction, name='count_prediction'),
]
