from django.contrib import admin

# Register your models here.
'''TABLAS IMPORTACION'''
# Tabla Paciente
from .models import (
    Paciente,
    Especialidad,
    HorarioDeAtencion,
    Medico,
    Turno,
    Pago,
    RegistroDeConsulta,
    TurnosDisponibles
)
''''COLUMNAS TABLAS'''
# Tabla Paciente


class PacienteAdmin(admin.ModelAdmin):
    list_display = ('id',
                    'dni_paciente',
                    'nombre',
                    'apellido',
                    'email',
                    'clave',
                    'telefono',
                    # 'foto',
                    'pacienteUser')
# Tabla Especialidad


class EspecialidadAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'precio',
                    'duracion', 'foto', 'descripcion')
# Tabla HorarioDeAtencion


class HorarioDeAtencionAdmin(admin.ModelAdmin):
    list_display = ('id', 'dia_de_la_semana', 'hora_entrada', 'hora_salida')
# Tabla Medico


class MedicoAdmin(admin.ModelAdmin):

    list_display = ('id', 'matricula', 'nombre', 'apellido', 'email', 'clave',
                    'telefono', 'foto', 'id_especialidad', 'medicoUser')

# Tabla Turno


# Tabla Turno
class TurnoAdmin(admin.ModelAdmin):
    list_display = ('id', 'pagado', 'estado', 'turno_disponible',
                    'id_paciente', 'id_medico', 'obra_social')


class TurnosDisponiblesAdmin(admin.ModelAdmin):
    list_display = ('id', 'dia', 'hora', 'medico')
  #  search_fields = ('dia', 'medico__nombre', 'medico__apellido')
  #  list_filter = ('dia', 'medico')
  #  ordering = ('id',)

# Tabla Pago


class PagoAdmin(admin.ModelAdmin):
    list_display = ('id_pago', 'monto', 'fecha', 'hora', 'estado', 'id_turno')


class RegistroDeConsultaAdmin(admin.ModelAdmin):
    list_display = ('id', 'fecha', 'hora', 'sintomas',
                    'diagnostico', 'tratamiento', 'id_turno')


'''TABLAS REGISTROS'''
admin.site.register(Paciente, PacienteAdmin)
admin.site.register(Especialidad, EspecialidadAdmin)
admin.site.register(HorarioDeAtencion, HorarioDeAtencionAdmin)
admin.site.register(Medico, MedicoAdmin)
admin.site.register(Turno, TurnoAdmin)
admin.site.register(Pago, PagoAdmin)
admin.site.register(RegistroDeConsulta, RegistroDeConsultaAdmin)
admin.site.register(TurnosDisponibles, TurnosDisponiblesAdmin)
