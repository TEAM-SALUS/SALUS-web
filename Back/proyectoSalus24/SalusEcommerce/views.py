from django.http import Http404
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.models import User

'''IMPORTAR TABLAS DE models'''
# Model
from .models import (ObraSocial,Paciente,Especialidad,HorarioDeAtencion,Medico,Turno,Pago)

'''IMPORTAR SERIALIZER DE serializers'''
# Serializer
from .serializers import (ObraSocialSerializer,PacienteSerializer,EspecialidadSerializer,HorarioDeAtencionSerializer,MedicoSerializer,TurnoSerializer,PagoSerializer,RegisterSerializer,UserSerializer)

''' API REST FRAMEWORK CORS '''
from rest_framework import (viewsets,generics,permissions,status)

from rest_framework.response import Response
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView

# Create your views here.
'''CRUD - ABML'''
"""
TABLA ObraSocial
"""
# Obtiene CRUD
class ObraSocialViewSet(viewsets.ModelViewSet):
    permission_classes=(permissions.IsAuthenticated,)

    queryset=ObraSocial.objects.all()
    serializer_class=ObraSocialSerializer

"""
TABLA Paciente
"""
# Obtiene CRUD
class PacienteViewSet(viewsets.ModelViewSet):
    permission_classes=(permissions.AllowAny,)

    queryset=Paciente.objects.all()
    serializer_class=PacienteSerializer

# Obtiene Paciente por id usuario
class PacientePorIdUsuarioView(APIView):
    permission_classes=(permissions.AllowAny,)

    def get_object(self,id=None,format=None):
        try:
            return Paciente.objects.get(pacienteUser=id)
        except Paciente.DoesNotExist:
            raise Http404
        
    def get(self,request,id,format=None):
        modelo=self.get_object(id)
        serializer=PacienteSerializer(modelo)
        return Response(serializer.data)
    
    def put(self, request, id, format=None):
        modelo = self.get_object(id)
        serializer = PacienteSerializer(modelo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, id, format=None):
        modelo = self.get_object(id)
        serializer = PacienteSerializer(modelo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id, format=None):
        modelo = self.get_object(id)
        modelo.delete()  # Elimina el objeto
        return Response(status=status.HTTP_204_NO_CONTENT)

# Lista, Actualiza y borra Pacientes por Usuario
class PacientePorUserView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=(permissions.IsAuthenticated,)

    def get(self,request,idpu=None):
        pacienteUser=Paciente.objects.filter(pacienteUser=idpu)
        serializer=PacienteSerializer(pacienteUser,many=True)
        return Response(serializer.data)

    def put(self,request,idpu=None):
        try:
            pacienteUser=Paciente.objects.get(pacienteUser=idpu)
        except Paciente.DoesNotExist:
            return Response({'error':'Paciente no encontrado'},status=status.HTTP_404_NOT_FOUND)

        serializer=PacienteSerializer(pacienteUser,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,idpu=None):
        try:
            pacienteUser=Paciente.objects.get(pacienteUser=idpu)
        except Paciente.DoesNotExist:
            return Response({'error': 'Paciente no encontrado'},status=status.HTTP_404_NOT_FOUND)

        pacienteUser.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Actualiza Paciente por Usuario
class EditarPerfilPaciente(UpdateAPIView):
    serializer_class=PacienteSerializer
    permission_classes=[permissions.IsAuthenticated]

    def update(self,request,*args,**kwargs):
        paciente_user_id=request.data.get('pacienteUser')

        if not paciente_user_id:
            return Response({'error':'El ID del paciente no fue proporcionado en los datos.'},status=status.HTTP_400_BAD_REQUEST)

        try:
            paciente=Paciente.objects.get(id=paciente_user_id)
        except Paciente.DoesNotExist:
            return Response({'error': 'No se encontró ningún paciente con el ID proporcionado.'},status=status.HTTP_404_NOT_FOUND)

        if paciente.pacienteUser != request.user:
            return Response({'error': 'No tienes permiso para actualizar este perfil de paciente.'},status=status.HTTP_403_FORBIDDEN)

        serializer=self.get_serializer(paciente,data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

# Registra Paciente
class PacienteRegistroView(APIView):
    permission_classes=(permissions.IsAuthenticated,)

    def post(self,request,format=None):
        serializer=PacienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# no se que hace pero funciona?
class ProfileView(generics.RetrieveUpdateAPIView):
    # Solo usuarios logueados pueden ver.
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=PacienteSerializer
    http_method_names=['get','put']

    def get_object(self):
        if self.request.user.is_authenticated:
            return self.request.user

    def put(self,request,*args,**kwargs):
        instance=self.get_object()
        serializer=PacienteSerializer(instance,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

"""
TABLA Especialidad
"""
# Obtiene CRUD Especialidad
class EspecialidadViewSet(viewsets.ModelViewSet):
    # permission_classes=(permissions.IsAdminUser,)
    permission_classes=(permissions.AllowAny,)

    queryset=Especialidad.objects.all()
    serializer_class=EspecialidadSerializer

# Lista Especialidad
class EspecialidadPorIdView(APIView):
    permission_classes=(permissions.IsAuthenticated,)

    def get_object(self,id):
        try:
            return Especialidad.objects.get(id=id)
        except Especialidad.DoesNotExist:
            raise Http404    
    
    def get(self,request,id,format=None):
        modelo=self.get_object(id)
        serializer=EspecialidadSerializer(modelo)
        return Response(serializer.data)

    """ def get(self,request,ide=None):
        especialidadId=Especialidad.objects.filter(id=ide)
        serializer=EspecialidadSerializer(especialidadId,many=True)
        return Response(serializer.data) """
    
# Lista Especialidad
class EspecialidadListView(APIView):
    permission_classes=(permissions.AllowAny,)

    def get(self,request,format=None):
        especialidadList=Especialidad.objects.all()
        serializer=EspecialidadSerializer(especialidadList,many=True)
        return Response(serializer.data)

"""
Tabla HorarioDeAtencion
"""
# Obtiene CRUD HorarioDeAtencion
class HorarioDeAtencionViewSet(viewsets.ModelViewSet):
    # permission_classes=(permissions.IsAdminUser,)
    permission_classes=(permissions.AllowAny,)
    queryset=HorarioDeAtencion.objects.all()
    serializer_class=HorarioDeAtencionSerializer

# Lista HorarioDeAtencion por id
class HorarioDeAtencionPorIdView(APIView):
    permission_classes=(permissions.AllowAny,)

    def get_object(self,id=None,format=None):
        try:
            return HorarioDeAtencion.objects.get(id=id)
        except HorarioDeAtencion.DoesNotExist:
            raise Http404
        
    def get(self,request,id,format=None):
        modelo=self.get_object(id)
        serializer=HorarioDeAtencionSerializer(modelo)
        return Response(serializer.data)

    """ def get(self,request,idh=None):
        horarioDeAtencionId=HorarioDeAtencion.objects.filter(id=idh)
        serializer=HorarioDeAtencionSerializer(horarioDeAtencionId,many=True)
        return Response(serializer.data) """

"""
TABLA Medico
"""
# Obtiene CRUD Medico
class MedicoViewSet(viewsets.ModelViewSet):
    # permission_classes=(permissions.IsAdminUser,)
    
    permission_classes=(permissions.AllowAny,)
    queryset=Medico.objects.all()
    serializer_class=MedicoSerializer

# Obtiene medico por id
class MedicoPorIdView(APIView):
    permission_classes=(permissions.AllowAny,)

    def get_object(self,id):
        try:
            return Medico.objects.get(id=id)
        except Medico.DoesNotExist:
            raise Http404    
    
    def get(self,request,id,format=None):
        modelo=self.get_object(id)
        serializer=MedicoSerializer(modelo)
        return Response(serializer.data)

# Lista medico por Usuario
class MedicoPorUserView(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self,request,idmu=None):
        medicoUser=Medico.objects.filter(medicoUser=idmu)
        serializer=MedicoSerializer(medicoUser,many=True)
        return Response(serializer.data)
    
# Obtiene Medico por id usuario
class MedicoPorIdUsuarioView(APIView):
    permission_classes=(permissions.IsAuthenticated,)

    def get_object(self,idmu=None,format=None):
        try:
            return Medico.objects.get(medicoUser=idmu)
        except Medico.DoesNotExist:
            raise Http404
        
    def get(self,request,idmu,format=None):
        modelo=self.get_object(idmu)
        serializer=MedicoSerializer(modelo)
        return Response(serializer.data)

# Lista Medico por Especialidad
class MedicoPorEspecialidadView(APIView):
    permission_classes=(permissions.AllowAny,)

    def get(self,request,ide=None):
        medicoEspecialidad=Medico.objects.filter(id_especialidad=ide)
        serializer=MedicoSerializer(medicoEspecialidad,many=True)
        return Response(serializer.data)
    
# Lista Medico
class MedicoListView(APIView):
    permission_classes=(permissions.AllowAny,)

    def get(self,request,format=None):
        medicoUser=Medico.objects.all()
        serializer=MedicoSerializer(medicoUser, many=True)
        return Response(serializer.data)

"""
TABLA Turno
"""
# Obtiene CRUD Turno
class TurnoViewSet(viewsets.ModelViewSet):
    permission_classes=(permissions.IsAdminUser,)
    queryset=Turno.objects.all()
    serializer_class=TurnoSerializer

# Registra Turno
class registrarTurno(APIView):
    permission_classes=(permissions.AllowAny,)

    def post(self,request,format=None):
        serializer=TurnoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# Obtiene Turno por id
class TurnoPorIdView(APIView):
    permission_classes=(permissions.AllowAny,)

    def get_object(self,id=None,format=None):
        try:
            return Turno.objects.get(id=id)
        except Turno.DoesNotExist:
            raise Http404
        
    def get(self,request,id,format=None):
        modelo=self.get_object(id)
        serializer=TurnoSerializer(modelo)
        return Response(serializer.data)
    
    def put(self, request, id, format=None):
        turno = self.get_object(id)
        serializer = TurnoSerializer(turno, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, id, format=None):
        turno = self.get_object(id)
        serializer = TurnoSerializer(turno, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id, format=None):
        turno = self.get_object(id)
        turno.delete()  # Elimina el objeto
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# Lista Turno por paciente
class TurnoPorPacienteView(APIView):
    permission_classes=(permissions.AllowAny,)

    def get(self,request,idp=None):
        turnoPorPaciente=Turno.objects.filter(id_paciente=idp)
        serializer=TurnoSerializer(turnoPorPaciente, many=True)
        return Response(serializer.data)

# Lista Turno por medico
class TurnoPorMedicoView(APIView):
    permission_classes=(permissions.AllowAny,)

    def get(self,request,idm=None):
        turnoPorMedico=Turno.objects.filter(id_medico=idm)
        serializer=TurnoSerializer(turnoPorMedico,many=True)
        return Response(serializer.data)

# Lista Turno
class TurnoListView(APIView):
    permission_classes=(permissions.AllowAny,)

    def get(self,request,format=None):
        turnoList=Turno.objects.all()
        serializer=TurnoSerializer(turnoList,many=True)
        return Response(serializer.data)
    
"""
TABLA Pago
"""
# Obtiene CRUD Pago
class PagoViewSet(viewsets.ModelViewSet):
    permission_classes=(permissions.IsAuthenticated,)
    queryset=Pago.objects.all()
    serializer_class=PagoSerializer

# Registra Pago
class pagar(APIView):
    permission_classes=[permissions.IsAuthenticated]

    def post(self,request,format=None):
        serializer=PagoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
# Lista Pago por turno
class PagoPorPacienteView(APIView):
    permission_classes=(permissions.AllowAny,)

    def get(self,request,idp=None):
        turnosPaciente=Turno.objects.filter(id_paciente=idp)
        pagoPorTurno=[]

        for turno in turnosPaciente:
            try:
                pago=get_object_or_404(Pago,id_turno=turno.id)
                pagoPorTurno.append(pago)
            except Pago.DoesNotExist:
                # Manejar el caso en que no se encuentra un objeto Pago
                continue
                pass

        serializer=PagoSerializer(pagoPorTurno, many=True)
        return Response(serializer.data)
    
'''# ------------ API user token'''
# Obtiene CRUD Usuario
class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes=(permissions.AllowAny,)
    queryset=User.objects.all()
    serializer_class=UserSerializer

# Registra Usuario
class RegisterAPI(generics.GenericAPIView):
    serializer_class=RegisterSerializer

    def post(self,request,*args,**kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        return Response({"user": UserSerializer(user, context=self.get_serializer_context()).data,"token": AuthToken.objects.create(user)[1]})
    
# Loguin Usuario
class LoginAPI(KnoxLoginView):
    permission_classes=(permissions.AllowAny,)

    def post(self,request,format=None):
        serializer=AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.validated_data['user']
        login(request,user)
        return super(LoginAPI,self).post(request,format=None)

# Perfil Usuario
class ManagerUserView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=(permissions.IsAuthenticated,)
    serializer_class=UserSerializer

    def get_object(self):
        return self.request.user

    """ def delete(self,request,*args,**kwargs):
        instance=self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self,request,*args,**kwargs):
        instance=self.get_object()
        serializer=self.get_serializer(instance,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data) """
