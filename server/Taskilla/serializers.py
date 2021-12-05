from rest_framework import serializers
from .models import Cards


class MainViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cards
        fields = '__all__'

