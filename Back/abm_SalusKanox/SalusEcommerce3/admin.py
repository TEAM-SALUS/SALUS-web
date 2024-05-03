from django.contrib import admin

# Register your models here.
# Tabla UsuariosMedicos
from .models import UsuariosMedicos
# Tabla UsuariosPacientes
from .models import UsuariosPacientes
# Tabla Servicios
from .models import Servicios
# Tabla Ventas
from .models import Ventas

# Register your models here.
# Tabla UsuariosMedicos
class UsuarioMedicoAdmin(admin.ModelAdmin):
    list_display=('id','Nombre_UM','Apellido_UM','Email_UM','Clave_UM','Celular_UM','Direccion_UM','Localidad_UM','Dni_UM','Matricula_UM')
# Tabla UsuariosPacientes
class UsuarioPacienteAdmin(admin.ModelAdmin):
    list_display=('id','Nombre_UP','Apellido_UP','Email_UP','Clave_UP','Celular_UP','Direccion_UP','Localidad_UP','Dni_UP')
# Tabla Servicios
class ServicioAdmin(admin.ModelAdmin):
    list_display=('id','TipoServicio_S','Precio_S','Descripcion_S')
# Tabla Ventas
class VentaAdmin(admin.ModelAdmin):
    #list_display=('id','FechaVenta_V','TotalVenta_V')
    list_display=('id','FechaVenta_V','TotalVenta_V','id_UP','id_S')

# Registrar tablas
# Tabla UsuariosMedicos
admin.site.register(UsuariosMedicos,UsuarioMedicoAdmin)
# Tabla UsuariosPacientes
admin.site.register(UsuariosPacientes,UsuarioPacienteAdmin)
# Tabla Servicios
admin.site.register(Servicios,ServicioAdmin)
# Tabla Ventas
admin.site.register(Ventas,VentaAdmin)