from urllib import response
from django.shortcuts import render

# API REST FRAMEWORK CORS
from rest_framework import viewsets
# Tabla UsuariosMedicos
from .models import UsuariosMedicos
from .serializer import UsuarioMedicoSerializer
# Tabla UsuariosPacientes
from .models import UsuariosPacientes
from .serializer import UsuarioPacienteSerializer
# Tabla Sevicios
from .models import Servicios
from .serializer import ServicioSerializer
# Tabla Ventas
from .models import Ventas
from .serializer import VentaSerializer

# Create your views here.

# CRUD - ABML
# Tabla UsuariosMedicos
class UsuarioMedicoViewSet(viewsets.ModelViewSet):
 
 queryset = UsuariosMedicos.objects.all()
 serializer_class = UsuarioMedicoSerializer

# Tabla UsuariosPacientes
class UsuarioPacienteViewSet(viewsets.ModelViewSet):
 queryset = UsuariosPacientes.objects.all()
 serializer_class = UsuarioPacienteSerializer

# Tabla Sevicios
class ServicioViewSet(viewsets.ModelViewSet):
 queryset = Servicios.objects.all()
 serializer_class = ServicioSerializer

# Tabla Ventas
class VentaViewSet(viewsets.ModelViewSet):
 queryset = Ventas.objects.all()
 serializer_class = VentaSerializer

 # Ventas por cliente
# class verVentasCliente(APIView):
#     #permission_classes = [permissions.IsAuthenticated]
#     def get(self,request,pk=None):
#         ventasCliente=Ventas.objects.filter(id_UP=pk)
#         serializer = VentaSerializer(ventasCliente, many=True)
#         return response(serializer.data)