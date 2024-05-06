
from django.urls import path, include
from rest_framework import routers

''' IMPORTAR VISTAS DE appSalus '''
from appSalus import views
''' IMPORTAR VISTAS DE VIEWS '''
from .views import (
    RegisterAPI,
    LoginAPI,
    ManagerUserView,
    PacientePorUserView,
    EspecialidadPorIdView,
    MedicoPorUserView
)
''' IMPORTAR USER KANOX TOKEN '''
from knox import views as kanox_views

router = routers.DefaultRouter()
router.register(r'paciente',views.PacienteViewSet)
router.register(r'especialidad',views.EspecialidadViewSet)
router.register(r'medico',views.MedicoViewSet)
router.register(r'atiende',views.AtiendeViewSet)
router.register(r'turno',views.TurnoViewSet)
router.register(r'pago',views.PagoViewSet)
router.register(r'registroDeConsulta',views.RegistroDeConsultaViewSet)
# ---
urlpatterns = [
    path('registro',RegisterAPI.as_view(),name='register'),
    path('profile',ManagerUserView.as_view(),name='profile'),
    path('login',LoginAPI.as_view(),name='login'),
    path('logout',kanox_views.LogoutView.as_view(),name='logout'),
    path('logoutall',kanox_views.LogoutAllView.as_view(),name='logoutall'),
    path('paciente-user/<int:idpu>',PacientePorUserView.as_view(),name='paciente_user'),
    path('especialidad-id/<int:ide>',EspecialidadPorIdView.as_view(),name='especialidad_id'),
    path('medico-user/<int:idmu>',MedicoPorUserView.as_view(),name='medico_user'),
    path('',include(router.urls)),
]