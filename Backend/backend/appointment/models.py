from django.db import models


class Appointment(models.Model):
    user = models.IntegerField()
    doctor_id = models.IntegerField()
    date = models.DateField()
    time = models.CharField(max_length=5)
    number = models.IntegerField(default=0)
    status = models.CharField(max_length=20)



