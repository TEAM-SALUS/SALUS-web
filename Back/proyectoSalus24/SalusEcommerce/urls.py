from knox import views as kanox_views
from .views import (
    RegisterAPI,
    LoginAPI,
    ManagerUserView,
    PacientePorUserView,
    EspecialidadPorIdView,
    HorarioDeAtencionPorIdView,
    MedicoPorUserView,
    pagar,
    registrarConsulta
)
from django.urls import path, include
from rest_framework import routers

''' IMPORTAR VISTAS DE appSalus '''
from SalusEcommerce import views
''' IMPORTAR VISTAS DE VIEWS '''
''' IMPORTAR USER KANOX TOKEN '''
router = routers.DefaultRouter()
router.register(r'paciente', views.PacienteViewSet)
router.register(r'especialidad', views.EspecialidadViewSet)
router.register(r'horariodeatencion', views.HorarioDeAtencionViewSet)
router.register(r'medico', views.MedicoViewSet)
router.register(r'turno', views.TurnoViewSet)
router.register(r'pago', views.PagoViewSet)
router.register(r'registroDeConsulta', views.RegistroDeConsultaViewSet)

# --
urlpatterns = [
    path('registro', RegisterAPI.as_view(), name='register'),
    path('profile', ManagerUserView.as_view(), name='profile'),
    path('login', LoginAPI.as_view(), name='login'),
    path('logout', kanox_views.LogoutView.as_view(), name='logout'),
    path('logoutall', kanox_views.LogoutAllView.as_view(), name='logoutall'),
    path('paciente-user/<int:idpu>',
         PacientePorUserView.as_view(), name='paciente_user'),
    path('especialidad-id/<int:ide>',
         EspecialidadPorIdView.as_view(), name='especialidad_id'),
    path('horariodeatencion-id/<int:idh>',
         HorarioDeAtencionPorIdView.as_view(), name='horariodeatencion_id'),
    path('medico-user/<int:idmu>', MedicoPorUserView.as_view(), name='medico_user'),
    path('Pagar/',
         pagar.as_view(), name='pago'),
    path('RegistrarConsulta/',
         registrarConsulta.as_view(), name='registroConsulta'),
    path('', include(router.urls)),
]
