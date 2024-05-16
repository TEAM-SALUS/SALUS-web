from django.contrib.auth.models import User
from rest_framework import serializers

# Tablas Paciente
from .models import (
    Paciente,
    Especialidad,
    HorarioDeAtencion,
    Medico,
    Turno,
    Pago,
    RegistroDeConsulta
)
# --- User

'''SERIALIZERS'''
# PacienteSerializer


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

# EspecialidadSerializer


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = '__all__'

# HorarioDeAtencionSerializer


class HorarioDeAtencionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioDeAtencion
        fields = '__all__'

# MedicoSerilizer


class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = '__all__'

# TurnoSerializer


class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = '__all__'

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'is_superuser', 'is_staff', 'is_active')
# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user


class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'


class RegistroDeConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroDeConsulta
        fields = '__all__'
