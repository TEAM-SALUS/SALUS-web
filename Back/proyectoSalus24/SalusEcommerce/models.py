import datetime
from django.db import models
from django.utils import timezone

from django.contrib.auth.models import User
from datetime import datetime, timedelta, time

# Create your models here.
'''TABLAS'''
# TABLA ObraSocial
class ObraSocial(models.Model):
    nombre=models.CharField(max_length=150)
    foto=models.ImageField(upload_to='obras-sociales',blank=True,default='obras-sociales/no-obra-social.png',verbose_name='foto obra social')
    is_active=models.BooleanField(blank=True,default=True)

    def __str__(self):
        return "{} {} {}".format(
            self.id,
            self.nombre,
            self.foto,
            self.is_active
        )
    
    class Meta:
        db_table="ObraSocial"
        verbose_name="ObraSocial"
        verbose_name_plural="ObrasSociales"
        constraints=[
            models.UniqueConstraint(fields=['nombre'],name='Uk_ObraSocial_nombre'),
        ]

# TABLA Paciente
class Paciente(models.Model):
    dni_paciente=models.CharField(max_length=8)
    nombre=models.CharField(max_length=150,blank=True,default="Sin nombre")
    apellido=models.CharField(max_length=150,blank=True,default=" Sin Apellido")
    email=models.CharField(max_length=254,blank=True,default="sin email")
    clave=models.CharField(max_length=128,blank=True,default="sin clave")
    telefono=models.CharField(max_length=15,blank=True,default="sin telefono")
    foto=models.ImageField(upload_to='paciente/perfil',blank=True,default='paciente/perfil/no-img.png',verbose_name='foto perfil paciente')
    is_active=models.BooleanField(blank=True,default=True)
    id_obra_social=models.ForeignKey(ObraSocial,on_delete=models.CASCADE,blank=True,default=1)
    pacienteUser=models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return "{} {} {} {} {} {} {} {} {} {} {}".format(
            self.id,
            self.dni_paciente,
            self.nombre,
            self.apellido,
            self.email,
            self.clave,
            self.telefono,
            self.foto,
            self.is_active,
            self.id_obra_social,
            self.pacienteUser
        )

    class Meta:
        db_table="Paciente"
        verbose_name="Paciente"
        verbose_name_plural="Pacientes"
        constraints=[
            models.UniqueConstraint(fields=['dni_paciente'],name='Uk_Paciente_dni_paciente'),
            models.UniqueConstraint(fields=['dni_paciente','id_obra_social'],name='Uk_Paciente_dni_paciente-id_obra_social'),
            models.UniqueConstraint(fields=['pacienteUser'],name='Uk_Paciente_pacienteUser'),
        ]

# TABLA Especialidad
class Especialidad(models.Model):
    nombre=models.CharField(max_length=150)
    precio=models.DecimalField(max_digits=10,decimal_places=2)
    duracion=models.TimeField(blank=True,default=timedelta(hours=1))
    descripcion=models.CharField(max_length=254,blank=True,default="sin descripcion")
    foto=models.ImageField(upload_to='especialidades',blank=True,default='especialidades/no-especialidad.jpg',verbose_name='foto especialidad')
    is_active=models.BooleanField(blank=True,default=True)

    def __str__(self):
        return "{} {} {} {} {} {} {}".format(
            self.id,
            self.nombre,
            self.precio,
            self.duracion,
            self.descripcion,
            self.foto,
            self.is_active
        )

    class Meta:
        db_table="Especialidad"
        verbose_name="Especialidad"
        verbose_name_plural="Especialidades"
        constraints=[
            models.UniqueConstraint(fields=['nombre'],name='Uk_Especialidad_nombre'),
        ]

# TABLA HorarioDeAtención
class HorarioDeAtencion(models.Model):
    dia_de_la_semana=models.CharField(max_length=150)
    hora_entrada=models.TimeField(blank=True,default=time(hour=8))
    hora_salida=models.TimeField(blank=True,default=time(hour=16))
    is_active=models.BooleanField(blank=True,default=True)

    def __str__(self):
        return "{} {} {} {} {}".format(
            self.id,
            self.dia_de_la_semana,
            self.hora_entrada,
            self.hora_salida,
            self.is_active
        )

    class Meta:
        db_table="HorarioDeAtencion"
        verbose_name="HorarioDeAtencion"
        verbose_name_plural="HorariosDeAtenciones"
        constraints=[
            models.UniqueConstraint(fields=['dia_de_la_semana','hora_entrada','hora_salida'],name='Uk_HorarioDeAtencion_dia_de_la_semana-hora_entrada-hora_salida'),
        ]

# TABLA Medico
class Medico(models.Model):
    matricula=models.CharField(max_length=11)
    nombre=models.CharField(max_length=150,blank=True,default="Sin Nombre")
    apellido=models.CharField(max_length=150,blank=True,default="Sin Apellido")
    email=models.CharField(max_length=254,blank=True,default="Sin Email")
    clave=models.CharField(max_length=128,blank=True,default="sin clave")
    telefono=models.CharField(max_length=15,blank=True,default="Sin Telefono")
    foto=models.ImageField(upload_to='medico/perfil',blank=True,default='medico/perfil/no-medic-img.jpg',verbose_name='foto perfil medico')
    is_active=models.BooleanField(blank=True,default=True)
    id_especialidad=models.ForeignKey(Especialidad,on_delete=models.CASCADE,blank=True,default=1)
    id_horario=models.ForeignKey(HorarioDeAtencion,on_delete=models.CASCADE,blank=True,default=1)
    medicoUser=models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return "{} {} {} {} {} {} {} {} {} {} {} {}".format(
            self.id,
            self.matricula,
            self.nombre,
            self.apellido,
            self.email,
            self.clave,
            self.telefono,
            self.foto,
            self.is_active,
            self.id_especialidad,
            self.id_horario,
            self.medicoUser
        )

    class Meta:
        db_table = "Medico"
        verbose_name = "Medico"
        verbose_name_plural = "Medicos"
        constraints = [
            models.UniqueConstraint(fields=['matricula'],name='Uk_Medico_matricula'),
            models.UniqueConstraint(fields=['matricula','id_especialidad'],name='Uk_Medico_matricula-id_especialidad'),
            models.UniqueConstraint(fields=['matricula','id_horario'],name='Uk_Medico_matricula-id_horario'),
            models.UniqueConstraint(fields=['medicoUser'],name='Uk_Medico_medicoUser'),
        ]

# TABLA Turno
class Turno(models.Model):
    '''ENUM'''
    PRESENTE="Presente"
    AUSENTE="Ausente"
    PENDIENTE="Pendiente"
    ESTADO = [
        (PRESENTE,"Presente"),
        (AUSENTE,"Ausente"),
        (PENDIENTE,"Pendiente"),
    ]

    fecha=models.DateField()
    horario=models.TimeField()
    pagado=models.BooleanField()
    estado=models.CharField(max_length=45,choices=ESTADO,blank=True,default=PENDIENTE)
    sintomas=models.CharField(max_length=1000,blank=True,default="sin sintomas")
    diagnostico=models.CharField(max_length=1000,blank=True,default="sin diagnostico")
    tratamiento=models.CharField(max_length=1000,blank=True,default="sin tratamiento")
    is_active=models.BooleanField(blank=True,default=True)
    id_paciente=models.ForeignKey(Paciente,on_delete=models.CASCADE)
    id_medico=models.ForeignKey(Medico,on_delete=models.CASCADE)    

    def __str__(self):
        return "{} {} {} {} {} {} {} {} {} {} {}".format(
            self.id,
            self.fecha,
            self.horario,
            self.pagado,
            self.estado,
            self.sintomas,
            self.diagnostico,
            self.tratamiento,
            self.is_active,
            self.id_paciente,
            self.id_medico
        )

    class Meta:
        db_table="Turno"
        verbose_name="Turno"
        verbose_name_plural="Turnos"

# TABLA Pago
def current_time():
    return timezone.now().time()

class Pago(models.Model):
    '''ENUM'''
    RECHAZADO="Rechazado"
    ACEPTADO="Aceptado"
    PENDIENTE="Pendiente"
    ESTADO=[
        (RECHAZADO, "Rechazado"),
        (ACEPTADO, "Aceptado"),
        (PENDIENTE, "Pendiento"),
    ]

    monto=models.DecimalField(max_digits=10,decimal_places=2)
    fecha=models.DateField(blank=True,default=datetime.now)
    hora=models.TimeField(blank=True,default=current_time)
    estado=models.CharField(max_length=45,choices=ESTADO,blank=True,default=RECHAZADO)
    is_active=models.BooleanField(blank=True,default=True)
    id_turno=models.ForeignKey(Turno,on_delete=models.CASCADE)

    def __str__(self):
        return "{} {} {} {} {} {} {}".format(
            self.id,
            self.monto,
            self.fecha,
            self.hora,
            self.estado,
            self.is_active,
            self.id_turno
        )
    
    class Meta:
        db_table="Pago"
        verbose_name="Pago"
        verbose_name_plural="Pagos"
        constraints = [
            models.UniqueConstraint(fields=['id_turno'],name='Uk_Pago_id_turno'),
        ]
