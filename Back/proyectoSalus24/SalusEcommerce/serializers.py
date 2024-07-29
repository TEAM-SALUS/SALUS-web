from django.contrib.auth.models import User
from rest_framework import serializers

'''IMPORTRAR TABLAS DE models'''
# Tablas
from .models import (ObraSocial,Paciente,Especialidad,HorarioDeAtencion,Medico,Turno,Pago)

'''SERIALIZERS DE TABLAS'''
# ObraSocialSerializer
class ObraSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model=ObraSocial
        fields='__all__'

# PacienteSerializer
class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Paciente
        fields='__all__'

# EspecialidadSerializer
class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model=Especialidad
        fields='__all__'

# HorarioDeAtencionSerializer
class HorarioDeAtencionSerializer(serializers.ModelSerializer):
    class Meta:
        model=HorarioDeAtencion
        fields='__all__'

# MedicoSerilizer
class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Medico
        fields='__all__'

# TurnoSerializer
class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Turno
        fields='__all__'

# PagoSerializer
class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Pago
        fields='__all__'

# --- User
# UserSerializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=(
            'id',
            'password',
            'last_login',
            'is_superuser',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'is_active',
            'date_joined')
        
# RegisterSerializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=(
            'id',
            'password',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_superuser',
            'is_staff',
            'is_active')
        extra_kwargs={'password': {'write_only': True}}

    def create(self, validated_data):
        if validated_data['is_superuser']:
            user=User.objects.create_superuser(validated_data['username'],validated_data['email'],validated_data['password'])
            user.first_name=validated_data['first_name']
            user.last_name=validated_data['last_name']
            user.save()
        elif validated_data['is_staff']:
            user=User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
            user.is_staff=True
            user.first_name=validated_data['first_name']
            user.last_name=validated_data['last_name']
            user.save()
        else:
            user=User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])            
            user.first_name=validated_data['first_name']
            user.last_name=validated_data['last_name']
            user.save()
        return user
