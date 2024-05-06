from django.db import models

from django.contrib.auth.models import User

# Create your models here.
'''TABLAS'''
# Tabla Paciente
class Paciente(models.Model):
    dni_paciente = models.CharField(max_length=11,unique=True)
    nombre = models.CharField(max_length=150,blank=True)
    apellido = models.CharField(max_length=150,blank=True)
    email = models.CharField(max_length=254,blank=True)
    clave = models.CharField(max_length=128)
    telefono = models.CharField(max_length=15,blank=True)
    #id_pacienteauthuser = models.ForeignKey(User,on_delete=models.CASCADE)
    pacienteUser = models.ForeignKey(User, on_delete=models.CASCADE,default=1)

    def __unicode__(self):
        #return "{} {} {} {} {} {} {}".format(self.id,self.dni_paciente,self.nombre,self.apellido,self.email,self.clave,self.telefono)
        return "{} {} {} {} {} {} {} {}".format(self.id,self.dni_paciente,self.nombre,self.apellido,self.email,self.clave,self.telefono,self.pacienteUser)
    
    def __str__(self):
        #return "{} {} {} {} {} {} {}".format(self.id,self.dni_paciente,self.nombre,self.apellido,self.email,self.clave,self.telefono)
        return "{} {} {} {} {} {} {} {}".format(self.id,self.dni_paciente,self.nombre,self.apellido,self.email,self.clave,self.telefono,self.pacienteUser)

    class Meta:
        db_table = "Paciente"
        verbose_name = "Paciente"
        verbose_name_plural = "Pacientes"
        constraints = [
            models.UniqueConstraint(fields=['dni_paciente'],name='Uk_Paciente_dni'),
        ]