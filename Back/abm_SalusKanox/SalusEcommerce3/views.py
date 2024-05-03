from django.shortcuts import render
#--- mercadopago
import mercadopago
import json
#---user
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from .serializer import RegisterSerializer, UserSerializer
#User
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
#---finUser

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
# ------------ API usuario
class RegisterAPI(generics.GenericAPIView):
	serializer_class = RegisterSerializer

	def post(self,request,*args,**kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user= serializer.save()
		return Response({
		"user":UserSerializer(user, context=self.get_serializer_context()).data,
		"token":AuthToken.objects.create(user)[1]
		})

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request,format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request,user)
        return super(LoginAPI, self).post(request,format=None)



# CRUD - ABML
# Tabla UsuariosMedicos
class UsuarioMedicoViewSet(viewsets.ModelViewSet):
 #permission_classes = (permissions.IsAuthenticated,) 

 queryset = UsuariosMedicos.objects.all()
 serializer_class = UsuarioMedicoSerializer

# Tabla UsuariosPacientes
class UsuarioPacienteViewSet(viewsets.ModelViewSet):
 #permission_classes = (permissions.IsAuthenticated,)

 queryset = UsuariosPacientes.objects.all()
 serializer_class = UsuarioPacienteSerializer

# Tabla Sevicios
class ServicioViewSet(viewsets.ModelViewSet):
 #permission_classes = (permissions.IsAdminUser,)

 queryset = Servicios.objects.all()
 serializer_class = ServicioSerializer

# Tabla Ventas
class VentaViewSet(viewsets.ModelViewSet):
 #permission_classes = (permissions.IsAdminUser,)

 queryset = Ventas.objects.all()
 serializer_class = VentaSerializer

# Ventas por cliente
class verVentasCliente(APIView):
    #permission_classes = [permissions.IsAuthenticated]
    def get(self,request,pk=None):
        ventasCliente=Ventas.objects.filter(id_UP=pk)
        serializer = VentaSerializer(ventasCliente, many=True)
        return Response(serializer.data)

# pasarela de pago mercadolibre
class ProcessPaymentAPIView(APIView):
    def post(self, request):
        try:
            request_values = json.loads(request.body)
            payment_data = {
                "transaction_amount": float(request_values["transaction_amount"]),
                "token": request_values["token"],
                "installments": int(request_values["installments"]),
                "payment_method_id": request_values["payment_method_id"],
                "issuer_id": request_values["issuer_id"],
                "payer": {
                    "email": request_values["payer"]["email"],
                    "identification": {
                        "type": request_values["payer"]["identification"]["type"],
                        "number": request_values["payer"]["identification"]["number"],
                    },
                },
            }

            sdk = mercadopago.SDK("")

            payment_response = sdk.payment().create(payment_data)

            payment = payment_response["response"]
            status = {
                "id": payment["id"],
                "status": payment["status"],
                "status_detail": payment["status_detail"],
            }

            return Response(data={"body": status, "statusCode": payment_response["status"]}, status=201)
        except Exception as e:
            return Response(data={"body": payment_response}, status=400)

class retornarPagado(APIView):  # Retornar custom json 
    def get(self, request):
        return Response({"respuesta": "aprobado"})

# el pago a mercadopago es simulado falta implemnatar correctamente la api