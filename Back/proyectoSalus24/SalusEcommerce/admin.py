from django.contrib import admin

# Register your models here.
'''TABLAS IMPORTACION'''
# Tabla Paciente
from .models import (ObraSocial,Paciente,Especialidad,HorarioDeAtencion,Medico,Turno,Pago)

''''COLUMNAS TABLAS'''
# Tabla ObraSocial
class ObraSocialAdmin(admin.ModelAdmin):
    list_display=(
        'id',
        'nombre',
        'foto',
        'is_active')

# Tabla Paciente
class PacienteAdmin(admin.ModelAdmin):
    list_display=(
        'id',
        'dni_paciente',
        'nombre',
        'apellido',
        'email',
        'clave',
        'telefono',
        'foto',
        'is_active',
        'id_obra_social',
        'pacienteUser')
    
# Tabla Especialidad
class EspecialidadAdmin(admin.ModelAdmin):
    list_display=(
        'id',
        'nombre',
        'precio',
        'duracion',
        'descripcion',
        'foto',
        'is_active')

# Tabla HorarioDeAtencion
class HorarioDeAtencionAdmin(admin.ModelAdmin):
    list_display=(
        'id',
        'dia_de_la_semana',
        'hora_entrada',
        'hora_salida',
        'is_active')

# Tabla Medico
class MedicoAdmin(admin.ModelAdmin):
    list_display=(
        'id',
        'matricula',
        'nombre',
        'apellido',
        'email',
        'clave',
        'telefono',
        'foto',
        'is_active',
        'id_especialidad',
        'id_horario',
        'medicoUser')

# Tabla Turno
class TurnoAdmin(admin.ModelAdmin):
    list_display=(
        'id',
        'fecha',
        'horario',
        'pagado',
        'estado',
        'sintomas',
        'diagnostico',
        'tratamiento',
        'is_active',
        'id_paciente',
        'id_medico')

# Tabla Pago
class PagoAdmin(admin.ModelAdmin):
    list_display=(
        'id',
        'monto',
        'fecha',
        'hora',
        'estado',
        'is_active',
        'id_turno')

'''TABLAS REGISTROS'''
admin.site.register(ObraSocial,ObraSocialAdmin)
admin.site.register(Paciente,PacienteAdmin)
admin.site.register(Especialidad,EspecialidadAdmin)
admin.site.register(HorarioDeAtencion,HorarioDeAtencionAdmin)
admin.site.register(Medico,MedicoAdmin)
admin.site.register(Turno,TurnoAdmin)
admin.site.register(Pago,PagoAdmin)
