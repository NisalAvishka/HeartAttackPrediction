from django.db import models


class Doctor(models.Model):

    doctor_type = models.CharField(max_length=250)
    user_id = models.IntegerField()
    mbbs_number = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=15, blank=True, null=True)


