from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone


class User(AbstractUser):
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    role = models.CharField(max_length=50)
    city = models.CharField(max_length=100)
    dob = models.DateField(default=date.today)
    gender = models.CharField(max_length=50)
    picture = models.ImageField(upload_to='files/profile/', default='files/profile/default.jpg')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def change_password(self, new_password):
        self.password = make_password(new_password)
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
