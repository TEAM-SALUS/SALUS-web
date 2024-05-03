from django.urls import path, include
from rest_framework import routers

# from Servicios.views import ServicioViewSet
from SalusEcommerce3 import views
#-------User
from .views import RegisterAPI
from knox import views as knox_views
from .views import LoginAPI
from .views import retornarPagado, verVentasCliente

router=routers.DefaultRouter()
router.register(r'usuariosmedicos',views.UsuarioMedicoViewSet)
router.register(r'usuariospacientes',views.UsuarioPacienteViewSet)
router.register(r'servicios',views.ServicioViewSet)
router.register(r'ventas',views.VentaViewSet)
#----
urlpatterns=[
    path('registro', RegisterAPI.as_view(), name = 'register'),
    path('login', LoginAPI.as_view(), name = 'login'),
    path('logout', knox_views.LogoutView.as_view(), name = 'logout'),
    path('logoutall', knox_views.LogoutAllView.as_view(), name = 'logoutall'),
    path('retornarPagado/', retornarPagado.as_view(), name='retornarPagado'),
    path('ventacliente/<int:pk>', verVentasCliente.as_view(), name = 'venta_cliente'),
    path('',include(router.urls)),
]