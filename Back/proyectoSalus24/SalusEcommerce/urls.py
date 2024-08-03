''' IMPORTAR USER KANOX TOKEN '''
from knox import views as kanox_views

''' IMPORTAR VISTAS DE views.py '''
from .views import (RegisterAPI,LoginAPI,ManagerUserView,PacientePorIdUsuarioView,PacientePorUserView,PacienteRegistroView,EspecialidadPorIdView,EspecialidadListView,HorarioDeAtencionPorIdView,MedicoPorIdView,MedicoPorUserView,MedicoPorIdUsuarioView,MedicoPorEspecialidadView,MedicoListView,registrarTurno,TurnoPorIdView,TurnoPorPacienteView,TurnoPorMedicoView,TurnoListView,pagar,PagoPorPacienteView,ProfileView,EditarPerfilPaciente,)

''' IMPORTAR VISTAS viewsets DE SalusEcommerce '''
from SalusEcommerce import views

from django.urls import (path, include)
from rest_framework import routers

# --
router = routers.DefaultRouter()
router.register(r'obra-social',views.ObraSocialViewSet)
router.register(r'paciente',views.PacienteViewSet)
router.register(r'especialidad',views.EspecialidadViewSet)
router.register(r'horario-de-atencion',views.HorarioDeAtencionViewSet)
router.register(r'medico',views.MedicoViewSet)
router.register(r'turno',views.TurnoViewSet)
router.register(r'pago',views.PagoViewSet)
router.register(r'usuario',views.UsuarioViewSet)

# --
urlpatterns = [
    path('registro',RegisterAPI.as_view(),name='register'),
    path('profile',ManagerUserView.as_view(),name='profile'),
    path('login',LoginAPI.as_view(),name='login'),
    path('logout',kanox_views.LogoutView.as_view(),name='logout'),
    path('logoutall',kanox_views.LogoutAllView.as_view(),name='logoutall'),
    path('paciente-id-usuario/<int:id>',PacientePorIdUsuarioView.as_view(),name='paciente_id_usuario'),
    path('paciente-user/<int:idpu>',PacientePorUserView.as_view(),name='paciente_user'),
    path('paciente-registro',PacienteRegistroView.as_view(),name='paciente_registro'),
    path('especialidad-id/<int:id>',EspecialidadPorIdView.as_view(),name='especialidad_id'),
    path('especialidad-lista',EspecialidadListView.as_view(),name='especialidad_lista'),
    path('horario-de-atencion-id/<int:id>',HorarioDeAtencionPorIdView.as_view(),name='horariodeatencion_id'),
    path('medico-id/<int:id>',MedicoPorIdView.as_view(),name='medico_id'),
    path('medico-user/<int:idmu>',MedicoPorUserView.as_view(),name='medico_user'),
    path('medico-id-usuario/<int:idmu>',MedicoPorIdUsuarioView.as_view(),name='medico_id_usuario'),
    path('medico-especialidad/<int:ide>',MedicoPorEspecialidadView.as_view(),name='medico_especialidad'),
    path('medico-lista',MedicoListView.as_view(),name='medico_lista'),
    path('registrarturno',registrarTurno.as_view(),name='registrarturno'),
    path('turno-id/<int:id>',TurnoPorIdView.as_view(),name='turno_id'),
    path('turno-paciente/<int:idp>',TurnoPorPacienteView.as_view(),name='turno_paciente'),
    path('turno-medico/<int:idm>',TurnoPorMedicoView.as_view(),name='turno_medico'),
    path('turno-lista',TurnoListView.as_view(),name='turno_lista'),
    path('Pagar/',pagar.as_view(),name='pago'),
    path('pago-paciente/<int:idp>',PagoPorPacienteView.as_view(),name='pago_paciente'),
    path('user/profile/',ProfileView.as_view(),name='user_profile'),
    path('editar-perfil-paciente/',EditarPerfilPaciente.as_view(),name='editar_perfil_paciente'),
    path('',include(router.urls)),
]
