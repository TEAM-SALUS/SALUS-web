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

# Tabla Medico
class Medico(models.Model):
    matricula = models.CharField(max_length=11,unique=True)
    nombre = models.CharField(max_length=150,blank=True)
    apellido = models.CharField(max_length=150,blank=True)
    email = models.CharField(max_length=254,blank=True)
    clave = models.CharField(max_length=128)
    telefono = models.CharField(max_length=15,blank=True)
    dias_atencion = models.DateField()
    horarios_atencion = models.TimeField()
    id_especialidad = models.ForeignKey(Especialidad,on_delete=models.CASCADE)
    medicoUser = models.ForeignKey(User, on_delete=models.CASCADE,default=1)
    #id_especialidad = models.ManyToOneRel(Especialidad, on_delete=models.CASCADE)
    #medicos_pacientes = models.ManyToManyField(Paciente)

    def __unicode__(self):
        #return "{} {} {} {} {} {} {} {} {}".format(self.id,self.matricula,self.nombre,self.apellido,self.email,self.clave,self.telefono,self.dias_atencion,self.horarios_atencion,self.id_especialidad)
        return "{} {} {} {} {} {} {} {} {} {}".format(self.id,self.matricula,self.nombre,self.apellido,self.email,self.clave,self.telefono,self.dias_atencion,self.horarios_atencion,self.id_especialidad,self.medicoUser)
    
    def __str__(self):
        #return "{} {} {} {} {} {} {} {} {}".format(self.id,self.matricula,self.nombre,self.apellido,self.email,self.clave,self.telefono,self.dias_atencion,self.horarios_atencion,self.id_especialidad)
        return "{} {} {} {} {} {} {} {} {} {}".format(self.id,self.matricula,self.nombre,self.apellido,self.email,self.clave,self.telefono,self.dias_atencion,self.horarios_atencion,self.id_especialidad,self.medicoUser)

    class Meta:
        db_table = "Medico"
        verbose_name = "Medico"
        verbose_name_plural = "Medicos"
        constraints = [
            models.UniqueConstraint(fields=['matricula'],name='Uk_Medico_matricula'),
        ]

# Tabla Atiende
class Atiende(models.Model):
    medico_id = models.ForeignKey(Medico,on_delete=models.CASCADE)
    paciente_id = models.ForeignKey(Paciente,on_delete=models.CASCADE)

    class Meta:
        db_table = "Atiende"
        verbose_name = "Atiende"
        verbose_name_plural = "Atienden"
        constraints = [
            models.UniqueConstraint(fields=['medico_id','paciente_id'],name='Uk_Medico_Paciente'),
        ]
    def __unicode__(self):
        return "{} {} {}".format(self.id,self.medico_id,self.paciente_id)
    def __str__(self):
        return "{} {} {}".format(self.id,self.medico_id,self.paciente_id)
    
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

# Tabla Pago
class Pago(models.Model):
    '''ENUM'''
    ACEPTADO = "Aceptado"
    RECHAZADO = "Rechazado"
    ESTADO = [
        (ACEPTADO, "Aceptado"),
        (RECHAZADO, "Rechazado"),
    ]
    fecha = models.DateField()
    hora = models.TimeField()
    estado = models.CharField(max_length=45,choices=ESTADO,blank=True,default=RECHAZADO)
    monto = models.DecimalField (max_length=10,max_digits=10,decimal_places=2)
    id_turno = models.ForeignKey(Turno,on_delete=models.CASCADE)
    class Meta:
        db_table = "Pago"
        verbose_name = "Pago"
        verbose_name_plural = "Pagos"
    def __unicode__(self):
        return "{} {} {} {} {} {}".format(self.id,self.fecha,self.hora,self.estado,self.monto,self.id_turno)
    def __str__(self):
        return "{} {} {} {} {} {}".format(self.id,self.fecha,self.hora,self.estado,self.monto,self.id_turno)
    
# Tabla RegistroDeConsulta
class RegistroDeConsulta(models.Model):
    fecha = models.DateField()
    hora = models.TimeField()
    sintomas = models.CharField(max_length=254)
    diagnostico = models.CharField(max_length=254)
    tratamiento = models.CharField(max_length=254)
    id_turno = models.ForeignKey(Turno,on_delete=models.CASCADE)
    class Meta:
        db_table = "RegistroDeConsulta"
        verbose_name = "RegistroDeConsulta"
        verbose_name_plural = "RegistrosDeConsultas"
    def __unicode__(self):
        return "{} {} {} {} {} {} {}".format(self.id,self.fecha,self.hora,self.sintomas,self.diagnostico,self.tratamiento,self.id_turno)
    def __str__(self):
        return "{} {} {} {} {} {} {}".format(self.id,self.fecha,self.hora,self.sintomas,self.diagnostico,self.tratamiento,self.id_turno)
