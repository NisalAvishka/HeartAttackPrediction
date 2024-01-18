from django.urls import path
from .views import (RegisterView, LoginView, UserView, LogoutView, GetUserDetails, UpdateUserView, GetAdminView,
                    DeleteUserView, ChangePasswordView)

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('get_user/<int:id>/', GetUserDetails.as_view(), name='get_user'),
    path('update_user/', UpdateUserView.as_view(), name='update_user'),
    path('get_admin/', GetAdminView.as_view(), name='get_admin'),
    path('delete_user/<int:userid>/', DeleteUserView.as_view(), name='delete-user'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),

]
