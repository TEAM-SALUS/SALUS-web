import datetime
from django.db import models

from django.contrib.auth.models import User
from datetime import datetime, timedelta, time

# Create your models here.
'''TABLAS'''
# Tabla Paciente


class Paciente(models.Model):
    dni_paciente = models.CharField(max_length=11, unique=True)
    nombre = models.CharField(max_length=150, blank=True)
    apellido = models.CharField(max_length=150, blank=True)
    email = models.CharField(max_length=254, blank=True)
    clave = models.CharField(max_length=128)
    telefono = models.CharField(max_length=15, blank=True)
    # foto = models.ImageField(upload_to='paciente/perfil', default='paciente/perfil/no-img.png', verbose_name='foto perfil paciente')
    pacienteUser = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return "{} {} {} {} {} {} {} {}".format(self.id, self.dni_paciente, self.nombre, self.apellido, self.email, self.clave, self.telefono, self.pacienteUser)
        # return "{} {} {} {} {} {} {} {} {}".format(self.id, self.dni_paciente, self.nombre, self.apellido, self.email, self.clave, self.telefono, self.foto, self.pacienteUser)

    class Meta:
        db_table = "Paciente"
        verbose_name = "Paciente"
        verbose_name_plural = "Pacientes"
        constraints = [
            models.UniqueConstraint(
                fields=['dni_paciente'], name='Uk_Paciente_dni'),
        ]

# Tabla Especialidad


class Especialidad(models.Model):
    nombre = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    duracion = models.TimeField(default=timedelta(hours=1))
    foto = models.ImageField(upload_to='especialidades',
                             default='especialidades/no-especialidad.jpg', verbose_name='foto especialidad')
    descripcion = models.CharField(max_length=254, blank=True, default="lorem")

    def __unicode__(self):
        return "{} {} {} {} {} {}".format(self.id, self.nombre, self.precio, self.duracion, self.foto, self.descripcion)

    def __str__(self):
        return "{} {} {} {} {} {}".format(self.id, self.nombre, self.precio, self.duracion, self.foto, self.descripcion)

    class Meta:
        db_table = "Especialidad"
        verbose_name = "Especialidad"
        verbose_name_plural = "Especialidad"
        constraints = [
            models.UniqueConstraint(
                fields=['nombre'], name='Uk_Especialidad_nombre'),
        ]

# Tabla HorarioDeAtención


# class HorarioDeAtencion(models.Model):
   # dia_de_la_semana = models.CharField(max_length=150)
   # hora_entrada = models.TimeField(default=time(hour=8))
   # hora_salida = models.TimeField(default=time(hour=16))

   # def __unicode__(self):
   #     return "{} {} {} {}".format(self.id, self.dia_de_la_semana, self.hora_entrada, self.hora_salida)

   # def __str__(self):
   #     return "{} {} {} {}".format(self.id, self.dia_de_la_semana, self.hora_entrada, self.hora_salida)

    # class Meta:
   #     db_table = "HorarioDeAtencion"
   #     verbose_name = "HorarioDeAtencion"
   #     verbose_name_plural = "HorarioDeAtencion"
   #     constraints = [
   #         models.UniqueConstraint(fields=[
   #                                 'dia_de_la_semana', 'hora_entrada', 'hora_salida'], name='Uk_HorarioDeAtencion'),
   #
   #  ]


# Tabla Medico


# class Medico(models.Model):
 #   matricula = models.CharField(max_length=11, unique=True)
  #  nombre = models.CharField(max_length=150, blank=True)
   # apellido = models.CharField(max_length=150, blank=True)
    # email = models.CharField(max_length=254, blank=True)
    # clave = models.CharField(max_length=128)
    # telefono = models.CharField(max_length=15, blank=True)
    # foto = models.ImageField(upload_to='medico/perfil',
     #                        default='medico/perfil/no-medic-img.jpg', verbose_name='foto perfil medico')
    # id_horario = models.ForeignKey(HorarioDeAtencion, on_delete=models.CASCADE)
    # id_especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE)
    # medicoUser = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    # def __unicode__(self):
     #   return "{} {} {} {} {} {} {} {} {} {} {}".format(self.id, self.matricula, self.nombre, self.apellido, self.email, self.clave, self.telefono, self.foto, self.id_horario, self.id_especialidad, self.medicoUser)

    # def __str__(self):
     #   return "{} {} {} {} {} {} {} {} {} {} {}".format(self.id, self.matricula, self.nombre, self.apellido, self.email, self.clave, self.telefono, self.foto, self.id_horario, self.id_especialidad, self.medicoUser)

    # class Meta:
     #   db_table = "Medico"
      #  verbose_name = "Medico"
       # verbose_name_plural = "Medicos"
        # constraints = [
        #   models.UniqueConstraint(fields=['matricula'], name='Uk_Medico'),
        # ]


# Tabla Medico
class Medico(models.Model):
    matricula = models.CharField(max_length=11, unique=True)
    nombre = models.CharField(max_length=150, blank=True)
    apellido = models.CharField(max_length=150, blank=True)
    email = models.CharField(max_length=254, blank=True)
    clave = models.CharField(max_length=128)
    telefono = models.CharField(max_length=15, blank=True)
    foto = models.ImageField(upload_to='medico/perfil',
                             default='medico/perfil/no-medic-img.jpg', verbose_name='foto perfil medico')
    id_especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE)
    medicoUser = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __unicode__(self):
        return "{} {} {} {} {} {} {} {} {}".format(self.id, self.matricula, self.nombre, self.apellido, self.email, self.clave, self.telefono, self.foto, self.id_especialidad, self.medicoUser)

    def __str__(self):
        return "{} {} {} {} {} {} {} {} {}".format(self.id, self.matricula, self.nombre, self.apellido, self.email, self.clave, self.telefono, self.foto, self.id_especialidad, self.medicoUser)

    class Meta:
        db_table = "Medico"
        verbose_name = "Medico"
        verbose_name_plural = "Medicos"
        constraints = [
            models.UniqueConstraint(fields=['matricula'], name='Uk_Medico'),
        ]

# Tabla HorarioDeAtención


class HorarioDeAtencion(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, null=True)
    dia_de_la_semana = models.CharField(max_length=150)
    hora_entrada = models.TimeField(default=time(hour=8))
    hora_salida = models.TimeField(default=time(hour=16))

    def __str__(self):
        return f"{self.medico.nombre if self.medico else 'Sin médico asignado'} - {self.dia_de_la_semana}: {self.hora_entrada} - {self.hora_salida}"

    class Meta:
        db_table = "HorarioDeAtencion"
        verbose_name = "HorarioDeAtencion"
        verbose_name_plural = "HorariosDeAtencion"
        constraints = [
            models.UniqueConstraint(fields=['medico', 'dia_de_la_semana', 'hora_entrada', 'hora_salida'],
                                    name='Uk_HorarioDeAtencion'),
        ]


# Nueva Tabla TurnosDisponibles
class TurnosDisponibles(models.Model):
    dia = models.DateField()
    hora = models.TimeField()
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)

    def __unicode__(self):
        return "{} {} {} {}".format(self.id, self.dia, self.hora, self.medico)

    def __str__(self):
        return "{} {} {} {}".format(self.id, self.dia, self.hora, self.medico)

    class Meta:
        db_table = "TurnosDisponibles"
        verbose_name = "TurnosDisponible"
        verbose_name_plural = "TurnosDisponibles"
        constraints = [
            models.UniqueConstraint(
                fields=['dia', 'hora', 'medico'], name='Uk_TurnosDisponibles'),
        ]
# Tabla Turno


class Turno(models.Model):
    '''ENUM'''
    CONCLUIDO = "Concluido"
    RECHAZADO = "Rechazado"
    PENDIENTE = "Pendiente"
    ESTADO = [
        (CONCLUIDO, "Concluido"),
        (RECHAZADO, "Rechazado"),
        (PENDIENTE, "Pendiente"),
    ]

    pagado = models.BooleanField()
    estado = models.CharField(
        max_length=45, choices=ESTADO, blank=True, default=RECHAZADO)
    turno_disponible = models.ForeignKey(
        'TurnosDisponibles', on_delete=models.CASCADE)
    id_paciente = models.ForeignKey(
        'Paciente', on_delete=models.CASCADE, default=-1)
    id_medico = models.ForeignKey(
        'Medico', on_delete=models.CASCADE, default=-1)
    obra_social = models.CharField(max_length=150, blank=True)  # Nuevo campo

    def __unicode__(self):
        return "{} {} {} {} {} {} {}".format(self.id, self.pagado, self.estado, self.id_paciente, self.id_medico, self.turno_disponible, self.obra_social)

    def __str__(self):
        return "{} {} {} {} {} {} {}".format(self.id, self.pagado, self.estado, self.id_paciente, self.id_medico, self.turno_disponible, self.obra_social)

    class Meta:
        db_table = "Turno"
        verbose_name = "Turno"
        verbose_name_plural = "Turnos"


class Pago(models.Model):
    RECHAZADO = "Rechazado"
    ACEPTADO = "Aceptado"
    PENDIENTE = "Pendiento"
    ESTADO = [
        (RECHAZADO, "Rechazado"),
        (ACEPTADO, "Aceptado"),
        (PENDIENTE, "Pendiento"),

    ]
    id_pago = models.AutoField(primary_key=True)
    monto = models.IntegerField()
    fecha = models.DateField(default=datetime.now)
    hora = models.TimeField(default=datetime.now)
    estado = models.CharField(
        max_length=45, choices=ESTADO, blank=True, default=RECHAZADO)
    id_turno = models.ForeignKey(Turno, on_delete=models.CASCADE, default=-1)

    class Meta:
        db_table = "pago"
        verbose_name = " Pago de turns reservado por paciente"
        verbose_name_plural = "PagosDeTurnos"

    def __unicode__(self):
        return "{} {} {} {} {} {}".format(self.id_pago, self.monto, self.fecha, self.hora, self.estado, self.id_turno)

    def __str__(self):
        return "{} {} {} {} {} {}".format(self.id_pago, self.monto, self.fecha, self.hora, self.estado, self.id_turno)


class RegistroDeConsulta(models.Model):
    fecha = models.DateField()
    hora = models.TimeField()
    sintomas = models.CharField(max_length=300)
    diagnostico = models.CharField(max_length=300)
    tratamiento = models.CharField(max_length=300)
    id_turno = models.ForeignKey(Turno, on_delete=models.CASCADE)

    class Meta:
        db_table = "RegistroDeConsulta"
        verbose_name = "RegistroDeConsulta"
        verbose_name_plural = "RegistrosDeConsultas"

    def __unicode__(self):
        return "{} {} {} {} {} {} {}".format(self.id, self.fecha, self.hora, self.sintomas, self.diagnostico, self.tratamiento, self.id_turno)

    def __str__(self):
        return "{} {} {} {} {} {} {}".format(self.id, self.fecha, self.hora, self.sintomas, self.diagnostico, self.tratamiento, self.id_turno)
