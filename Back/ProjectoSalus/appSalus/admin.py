from django.contrib import admin

# Register your models here.
'''TABLAS IMPORTACION'''
# Tabla Paciente,Especialidad,Medico,Atiende
from .models import (
    Paciente,
    Especialidad,
    Medico,
    Atiende,
    Turno,
    Pago,
    RegistroDeConsulta
)
''''COLUMNAS TABLAS'''
# Tabla Paciente
class PacienteAdmin(admin.ModelAdmin):
    #list_display = ('id','dni_paciente','nombre','apellido','email','clave','telefono')
    list_display = ('id','dni_paciente','nombre','apellido','email','clave','telefono','pacienteUser')
# Tabla Especialidad
class EspecialidadAdmin(admin.ModelAdmin):
    list_display = ('id','nombre','precio')
# Tabla Medico
class MedicoAdmin(admin.ModelAdmin):
    #list_display = ('id','matricula','nombre','apellido','email','clave','telefono','dias_atencion','horarios_atencion','id_especialidad')
    list_display = ('id','matricula','nombre','apellido','email','clave','telefono','dias_atencion','horarios_atencion','id_especialidad','medicoUser')
# Tabla Atiende
class AtiendeAdmin(admin.ModelAdmin):
    list_display = ('id','medico_id','paciente_id')
# Tabla Turno
class TurnoAdmin(admin.ModelAdmin):
    list_display = ('id','fecha','horario','pagado','estado','id_paciente','id_especialidad')
# Pago
class PagoAdmin(admin.ModelAdmin):
    list_display = ('id','fecha','hora','estado','monto','id_turno')
# RegistroDeConsulta
class RegistroDeConsultaAdmin(admin.ModelAdmin):
    list_display = ('id','fecha','hora','sintomas','diagnostico','tratamiento','id_turno')
'''TABLAS REGISTROS'''
admin.site.register(Paciente,PacienteAdmin)
admin.site.register(Especialidad,EspecialidadAdmin)
admin.site.register(Medico,MedicoAdmin)
admin.site.register(Atiende,AtiendeAdmin)
admin.site.register(Turno,TurnoAdmin)
admin.site.register(Pago,PagoAdmin)
admin.site.register(RegistroDeConsulta,RegistroDeConsultaAdmin)
