# Generated by Django 4.2.7 on 2023-11-27 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HeartAttackInput',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField()),
                ('sex', models.IntegerField()),
                ('pain', models.IntegerField()),
                ('pressure', models.IntegerField()),
                ('chol', models.IntegerField()),
                ('fbs', models.IntegerField()),
                ('restecg', models.IntegerField()),
                ('beats', models.IntegerField()),
                ('exercise', models.IntegerField()),
                ('oldpeak', models.FloatField()),
                ('slope', models.IntegerField()),
                ('vessels', models.IntegerField()),
                ('thall', models.IntegerField()),
            ],
        ),
    ]