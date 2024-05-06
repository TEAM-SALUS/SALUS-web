from django.contrib import admin

# Register your models here.
'''TABLAS IMPORTACION'''
# Tabla Paciente
from .models import (
    Paciente
)
''''COLUMNAS TABLAS'''
# Tabla Paciente
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('id','dni_paciente','nombre','apellido','email','clave','telefono','pacienteUser')
'''TABLAS REGISTROS'''
admin.site.register(Paciente,PacienteAdmin)
