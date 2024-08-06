
from django.http import Http404

import logging
from rest_framework.decorators import action
from django.shortcuts import render

# Create your views here.
# Model Serializer
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
from .serializers import (
    PacienteSerializer,
    EspecialidadSerializer,
    HorarioDeAtencionSerializer,
    MedicoSerializer,
    TurnoSerializer,
    PagoSerializer,
    RegistroDeConsultaSerializer,
    TurnosDisponiblesSerializer

)
''' API REST FRAMEWORK CORS '''
from rest_framework import viewsets
# --- User
from rest_framework import (
    generics,
    permissions,
    status
)
from .serializers import (
    RegisterSerializer,
    UserSerializer
)
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
Tabla Paciente
"""
# Obtiene CRUD
class PacienteViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAdminUser,)

    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

# Lista, Actualiza y borra Pacientes por Usuario
class PacientePorUserView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, idpu=None):
        pacienteUser = Paciente.objects.filter(pacienteUser=idpu)
        serializer = PacienteSerializer(pacienteUser, many=True)
        return Response(serializer.data)

    def put(self, request, idpu=None):
        try:
            pacienteUser = Paciente.objects.get(pacienteUser=idpu)
        except Paciente.DoesNotExist:
            return Response({'error': 'Paciente no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PacienteSerializer(pacienteUser, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, idpu=None):
        try:
            pacienteUser = Paciente.objects.get(pacienteUser=idpu)
        except Paciente.DoesNotExist:
            return Response({'error': 'Paciente no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        pacienteUser.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Actualiza Paciente por Usuario
class EditarPerfilPaciente(UpdateAPIView):
    serializer_class = PacienteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        paciente_user_id = request.data.get('pacienteUser')

        if not paciente_user_id:
            return Response({'error': 'El ID del paciente no fue proporcionado en los datos.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            paciente = Paciente.objects.get(id=paciente_user_id)
        except Paciente.DoesNotExist:
            return Response({'error': 'No se encontró ningún paciente con el ID proporcionado.'}, status=status.HTTP_404_NOT_FOUND)

        if paciente.pacienteUser != request.user:
            return Response({'error': 'No tienes permiso para actualizar este perfil de paciente.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(paciente, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

# Registra Paciente
class PacienteRegistroView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = PacienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# no se que hace pero funciona?
class ProfileView(generics.RetrieveUpdateAPIView):
    # Solo usuarios logueados pueden ver.
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PacienteSerializer
    http_method_names = ['get', 'put']

    def get_object(self):
        if self.request.user.is_authenticated:
            return self.request.user

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = PacienteSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
Tabla Especialidad
"""
# Obtiene CRUD Especialidad
class EspecialidadViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAdminUser,)
    permission_classes = (permissions.AllowAny,)

    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer

# Lista Especialidad
class EspecialidadPorIdView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, ide=None):
        especialidadId = Especialidad.objects.filter(id=ide)
        serializer = EspecialidadSerializer(especialidadId, many=True)
        return Response(serializer.data)


class EspecialidadListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        especialidadList = Especialidad.objects.all()
        serializer = EspecialidadSerializer(especialidadList, many=True)
        return Response(serializer.data)

"""
Tabla HorarioDeAtencion
"""
# Obtiene CRUD HorarioDeAtencion
class HorarioDeAtencionViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAdminUser,)
    permission_classes = (permissions.AllowAny,)
    queryset = HorarioDeAtencion.objects.all()
    serializer_class = HorarioDeAtencionSerializer

# Lista HorarioDeAtencion por id
class HorarioDeAtencionPorIdView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, medico_id=None):
        horarios = HorarioDeAtencion.objects.filter(medico_id=medico_id)
        serializer = HorarioDeAtencionSerializer(horarios, many=True)
        return Response(serializer.data)

"""
Tabla Medico
"""
# Obtiene CRUD Medico
class MedicoViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAdminUser,)
    permission_classes = (permissions.AllowAny,)
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

    @action(detail=False, methods=['get'], url_path='especialidad/(?P<especialidad_id>[^/.]+)')
    def get_medicos_por_especialidad(self, request, especialidad_id=None):
        medicos = Medico.objects.filter(id_especialidad=especialidad_id)
        serializer = self.get_serializer(medicos, many=True)
        return Response(serializer.data)


# Obtiene medico por id
class MedicoPorIdView(APIView):
    permission_classes = (permissions.AllowAny,)

    @action(detail=False, methods=['get'], url_path='especialidad/(?P<especialidad_id>[^/.]+)')
    def get_medicos_por_especialidad(self, request, especialidad_id=None):
        medicos = Medico.objects.filter(id_especialidad=especialidad_id)
        serializer = self.get_serializer(medicos, many=True)
        return Response(serializer.data)

    def get_object(self, id):
        try:
            return Medico.objects.get(id=id)
        except Medico.DoesNotExist:
            raise Http404    
    
    def get(self, request, id, format=None):
        modelo = self.get_object(id)
        serializer = MedicoSerializer(modelo)
        return Response(serializer.data)

# Lista medico por Usuario
class MedicoPorUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, idmu=None):
        medicoUser = Medico.objects.filter(medicoUser=idmu)
        serializer = MedicoSerializer(medicoUser, many=True)
        return Response(serializer.data)



# Lista Medico por Especialidad
class MedicoPorEspecialidadView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, ide=None):
        medicoEspecialidad = Medico.objects.filter(id_especialidad=ide)
        serializer = MedicoSerializer(medicoEspecialidad, many=True)
        return Response(serializer.data)
    
# Lista Medico


class MedicoListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        medicoUser = Medico.objects.all()
        serializer = MedicoSerializer(medicoUser, many=True)
        return Response(serializer.data)

"""
Tabla Turno
"""
# Obtiene CRUD Turno
class TurnoViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Turno.objects.all()
    serializer_class = TurnoSerializer

# Registra Turno
class registrarTurno(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        serializer = TurnoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Obtiene Turno por id
class TurnoPorIdView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_object(self, id=None, format=None):
        try:
            return Turno.objects.get(id=id)
        except Turno.DoesNotExist:
            raise Http404
        
    def get(self, request, id, format=None):
        modelo = self.get_object(id)
        serializer = TurnoSerializer(modelo)
        return Response(serializer.data)
    
# Lista Turno por paciente
class TurnoPorPacienteView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, idp=None):
        turnoPorPaciente = Turno.objects.filter(id_paciente=idp)
        serializer = TurnoSerializer(turnoPorPaciente, many=True)
        return Response(serializer.data)

# Lista Turno por medico
class TurnoPorMedicoView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, idm=None):
        turnoPorMedico = Turno.objects.filter(id_medico=idm)
        serializer = TurnoSerializer(turnoPorMedico, many=True)
        return Response(serializer.data)

# Lista Turno
class TurnoListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        turnoList = Turno.objects.all()
        serializer = TurnoSerializer(turnoList, many=True)
        return Response(serializer.data)
    
"""
Tabla Pago
"""
# Obtiene CRUD Pago
class PagoViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAdminUser,)
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

# Registra Pago
class pagar(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = PagoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
Tabla RegistroDeConsulta
"""
# Obtiene CRUD RegistroDeConsulta
class RegistroDeConsultaViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)

    queryset = RegistroDeConsulta.objects.all()
    serializer_class = RegistroDeConsultaSerializer


# Registra RegistroDeConsulta
class registrarConsulta(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = RegistroDeConsultaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Lista RegistroDeConsulta por id
class RegistroDeConsultaPorIdView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, id=None):
        registroDeConsultaId = RegistroDeConsulta.objects.filter(id=id)
        serializer = RegistroDeConsultaSerializer(registroDeConsultaId, many=True)
        return Response(serializer.data)

# Lista RegistroDeeConsulta por Turno
class RegistroDeConsultaPorTurnoView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, idt=None):
        registroDeConsultaTurno = RegistroDeConsulta.objects.filter(id_turno=idt)
        serializer = RegistroDeConsultaSerializer(registroDeConsultaTurno, many=True)
        return Response(serializer.data)
    
# Lista RegistroDeConsulta
class RegistroDeConsultaListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        registroDeConsultaList = RegistroDeConsulta.objects.all()
        serializer = RegistroDeConsultaSerializer(registroDeConsultaList, many=True)
        return Response(serializer.data)
    
'''# ------------ API usuario token'''
# Registra Usuario
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
    
# Loguin Usuario
class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)

# Perfil Usuario
class ManagerUserView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)



class PagoViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAdminUser,)
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer


class pagar(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = PagoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegistroDeConsultaViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = RegistroDeConsulta.objects.all()
    serializer_class = RegistroDeConsultaSerializer


class registrarConsulta(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = RegistroDeConsultaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegistroDeConsultaPorIdView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, id=None):
        registroDeConsultaId = RegistroDeConsulta.objects.filter(id=id)
        serializer = RegistroDeConsultaSerializer(
            registroDeConsultaId, many=True)
        return Response(serializer.data)


class RegistroDeConsultaPorTurnoView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, idt=None):
        registroDeConsultaTurno = RegistroDeConsulta.objects.filter(
            id_turno=idt)
        serializer = RegistroDeConsultaSerializer(
            registroDeConsultaTurno, many=True)
        return Response(serializer.data)


class RegistroDeConsultaListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        registroDeConsultaList = RegistroDeConsulta.objects.all()
        serializer = RegistroDeConsultaSerializer(
            registroDeConsultaList, many=True)
        return Response(serializer.data)

class TurnosDisponiblesList(generics.ListAPIView):
    serializer_class = TurnosDisponiblesSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        medico_id = self.request.query_params.get('medico', None)
        if medico_id is not None:
            return TurnosDisponibles.objects.filter(medico_id=medico_id)
        return TurnosDisponibles.objects.all()


class TurnosDisponiblesViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = TurnosDisponibles.objects.all()
    serializer_class = TurnosDisponiblesSerializer


class CreateTurnoView(generics.CreateAPIView):
    serializer_class = TurnoSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data
        try:
            turno = Turno.objects.create(
                pagado=data.get('pagado', False),
                estado=data.get('estado', 'Pendiente'),
                turno_disponible_id=data.get('turno_disponible'),
                id_paciente_id=data.get('id_paciente'),
                id_medico_id=data.get('id_medico'),
                obra_social=data.get('obra_social', '')
            )
            turno.save()
            serializer = TurnoSerializer(turno)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e), 'data_received': data}, status=status.HTTP_400_BAD_REQUEST)


class TurnosPorPacienteListView(generics.ListAPIView):
    serializer_class = TurnoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        id_paciente = self.request.query_params.get('id_paciente')
        return Turno.objects.filter(id_paciente_id=id_paciente)


logger = logging.getLogger(__name__)


class TurnoReservadoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Turno.objects.all()
    serializer_class = TurnoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        id = self.kwargs.get('pk', None)
        return Turno.objects.filter(id=id)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

