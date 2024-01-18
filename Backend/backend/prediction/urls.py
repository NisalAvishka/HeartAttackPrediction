from django.urls import path
from .views import predict_heart_attack, InsertPrediction, get_history

urlpatterns = [
    path('predict/', predict_heart_attack, name='predict_heart_attack'),
    path('insert_prediction/', InsertPrediction.as_view(), name='insert_prediction'),
    path('get_history/<int:user_id>/', get_history, name='get_history'),
]
