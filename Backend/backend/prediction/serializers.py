from rest_framework import serializers
from .models import HeartAttackInput


class HeartAttackInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeartAttackInput
        fields = '__all__'