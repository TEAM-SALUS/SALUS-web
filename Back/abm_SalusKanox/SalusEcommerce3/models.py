from django.db import models
from datetime import datetime

# Create your models here.

# Tabla UsuariosMedicos
class UsuariosMedicos(models.Model):
    Nombre_UM=models.CharField(max_length=45)
    Apellido_UM=models.CharField(max_length=45)
    Email_UM=models.CharField(max_length=45)
    Clave_UM=models.CharField(max_length=45)
    Celular_UM=models.CharField(max_length=45,blank=True,default="Celular_UM")
    Direccion_UM=models.CharField(max_length=100,blank=True,default="Direccion_UM")
    Localidad_UM=models.CharField(max_length=45,blank=True,default="Localidad_UM")
    Dni_UM=models.CharField(max_length=8,blank=True,default="Dni_UM")
    Matricula_UM=models.CharField(max_length=8,blank=True,default="Mat_UM")
    class Meta:
        db_table="UsuariosMedicos"
        verbose_name="Usuarios Medicos"
        verbose_name_plural="UsuariosMedicos"
    def __unicode__(self):
        return "{}".format(self.id)
    def __str__(self):
        return "{}".format(self.id)
    
# Tabla UsuariosPacientes
class UsuariosPacientes(models.Model):
    Nombre_UP=models.CharField(max_length=45)
    Apellido_UP=models.CharField(max_length=45)
    Email_UP=models.CharField(max_length=45)
    Clave_UP=models.CharField(max_length=45)
    Celular_UP=models.CharField(max_length=45,blank=True,default="Celular_UP")
    Direccion_UP=models.CharField(max_length=100,blank=True,default="Direccion_UP")
    Localidad_UP=models.CharField(max_length=45,blank=True,default="Localidad_UP")
    Dni_UP=models.CharField(max_length=8,blank=True,default="Dni_UP")
    class Meta:
        db_table="UsuariosPacientes"
        verbose_name="Usuarios Pacientes"
        verbose_name_plural="UsuariosPacientes"
    def __unicode__(self):
        return "{}".format(self.id)
    def __str__(self):
        return "{}".format(self.id)
    
# Tabla Servicios
class Servicios(models.Model):
    TipoServicio_S=models.CharField(max_length=20)
    Precio_S=models.DecimalField(max_digits=18,decimal_places=2)
    Descripcion_S=models.CharField(max_length=1000)
    class Meta:
        db_table="Servicios"
        verbose_name="Tipo de Servicios"
        verbose_name_plural="Servicios"
    def __unicode__(self):
        return self.TipoServicio_S
    def __str__(self):
        return self.TipoServicio_S
    
# Tabla Ventas
class Ventas(models.Model):
    FechaVenta_V=models.DateField(default=datetime.now)
    TotalVenta_V=models.DecimalField(max_digits=18,decimal_places=2)
    id_UP=models.ForeignKey(UsuariosPacientes,on_delete=models.CASCADE)
    id_S=models.ForeignKey(Servicios,on_delete=models.CASCADE)
    class Meta:
        db_table="Ventas"
        verbose_name="Ventas a Cuentas"
        verbose_name_plural="Ventas"
    def __unicode__(self):
        return "{}".format(self.id)
    def __str__(self):
        return "{}".format(self.id)