# Generated by Django 4.2.7 on 2023-12-01 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prediction', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='heartattackinput',
            name='prediction',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='heartattackinput',
            name='user_id',
            field=models.IntegerField(default=1),
        ),
    ]