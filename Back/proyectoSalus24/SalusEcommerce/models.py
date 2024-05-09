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
        
# Tabla Especialidad
class Especialidad(models.Model):
    nombre = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=10,decimal_places=2)

    def __unicode__(self):
        return "{} {} {}".format(self.id,self.nombre,self.precio)
    
    def __str__(self):
        return "{} {} {}".format(self.id,self.nombre,self.precio)
    
    class Meta:
        db_table = "Especialidad"
        verbose_name = "Especialidad"
        verbose_name_plural = "Especialidad"
        constraints = [
            models.UniqueConstraint(fields=['nombre'],name='Uk_Especialidad_nombre'),
        ]
    
# Tabla Turno
class Turno(models.Model):
    '''ENUM'''
    CONCLUIDO = "Concluido"
    RECHAZADO = "Rechazado"
    PENDIENTE = "Pendiento"
    ESTADO = [
        (CONCLUIDO, "Concluido"),
        (RECHAZADO, "Rechazado"),
        (PENDIENTE, "Pendiento"),
    ]
    fecha = models.DateField()
    horario = models.TimeField()
    pagado = models.BooleanField()
    estado = models.CharField(max_length=45,choices=ESTADO,blank=True,default=RECHAZADO)
    id_paciente = models.ForeignKey(Paciente,on_delete=models.CASCADE)
    id_especialidad = models.ForeignKey(Especialidad,on_delete=models.CASCADE)
    class Meta:
        db_table = "Turno"
        verbose_name = "Turno"
        verbose_name_plural = "Turnos"
    def __unicode__(self):
        return "{} {} {} {} {} {} {}".format(self.id,self.fecha,self.horario,self.pagado,self.estado,self.id_paciente,self.id_especialidad)
    def __string__(self):
        return "{} {} {} {} {} {} {}".format(self.id,self.fecha,self.horario,self.pagado,self.estado,self.id_paciente,self.id_especialidad)
