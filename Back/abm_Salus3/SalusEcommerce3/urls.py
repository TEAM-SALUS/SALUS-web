from django.urls import path, include
from rest_framework import routers

# from Servicios.views import ServicioViewSet
from SalusEcommerce3  import views

router=routers.DefaultRouter()
router.register(r'usuariosmedicos',views.UsuarioMedicoViewSet)
router.register(r'usuariospacientes',views.UsuarioPacienteViewSet)
router.register(r'servicios',views.ServicioViewSet)
router.register(r'ventas',views.VentaViewSet)
#----
urlpatterns=[
    path('',include(router.urls)),
]