from django.contrib import admin

# Register your models here.
'''TABLAS IMPORTACION'''
# Tabla Paciente
from .models import (
    Paciente,
    Especialidad,
    Turno,
)
''''COLUMNAS TABLAS'''
# Tabla Paciente
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('id','dni_paciente','nombre','apellido','email','clave','telefono','pacienteUser')
# Tabla Especialidad
class EspecialidadAdmin(admin.ModelAdmin):
    list_display = ('id','nombre','precio')
# Tabla Turno
class TurnoAdmin(admin.ModelAdmin):
    list_display = ('id','fecha','horario','pagado','estado','id_paciente','id_especialidad')
'''TABLAS REGISTROS'''
admin.site.register(Paciente,PacienteAdmin)
admin.site.register(Especialidad,EspecialidadAdmin)
admin.site.register(Turno,TurnoAdmin)

