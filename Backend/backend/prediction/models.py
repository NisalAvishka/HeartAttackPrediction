from django.db import models
from datetime import date


class HeartAttackInput(models.Model):
    age = models.IntegerField()
    sex = models.IntegerField()
    pain = models.IntegerField()
    pressure = models.IntegerField()
    chol = models.IntegerField()
    fbs = models.IntegerField()
    restecg = models.IntegerField()
    beats = models.IntegerField()
    exercise = models.IntegerField()
    oldpeak = models.FloatField()
    slope = models.IntegerField()
    vessels = models.IntegerField()
    thall = models.IntegerField()
    prediction = models.IntegerField(default=0)
    user_id = models.IntegerField(default=1)
    date = models.DateField(default=date.today)
