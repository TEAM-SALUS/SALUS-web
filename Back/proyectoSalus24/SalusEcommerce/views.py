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
    RegistroDeConsulta
)
from .serializers import (
    PacienteSerializer,
    EspecialidadSerializer,
    HorarioDeAtencionSerializer,
    MedicoSerializer,
    TurnoSerializer,
    PagoSerializer,
    RegistroDeConsultaSerializer

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
# Tabla Paciente


class PacienteViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAdminUser,)
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer


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


class PacienteRegistroView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = PacienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

# Tabla Especialidad


class EspecialidadViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAdminUser,)
    permission_classes = (permissions.AllowAny,)
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer


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

# Tabla HorarioDeAtencion


class HorarioDeAtencionViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAdminUser,)
    permission_classes = (permissions.AllowAny,)
    queryset = HorarioDeAtencion.objects.all()
    serializer_class = HorarioDeAtencionSerializer


class HorarioDeAtencionPorIdView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, idh=None):
        horarioDeAtencionId = HorarioDeAtencion.objects.filter(id=idh)
        serializer = HorarioDeAtencionSerializer(
            horarioDeAtencionId, many=True)
        return Response(serializer.data)

# Tabla Medico


class MedicoViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAdminUser,)
    permission_classes = (permissions.AllowAny,)
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

class MedicoPorIdView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, id=None):
        medicoId = Medico.objects.get(id=id)
        serializer = MedicoSerializer(medicoId, many=True)
        return Response(serializer.data)

class MedicoPorUserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, idmu=None):
        medicoUser = Medico.objects.filter(medicoUser=idmu)
        serializer = MedicoSerializer(medicoUser, many=True)
        return Response(serializer.data)
    
class MedicoPorEspecialidadView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, ide=None):
        medicoEspecialidad = Medico.objects.filter(id_especialidad=ide)
        serializer = MedicoSerializer(medicoEspecialidad, many=True)
        return Response(serializer.data)
    
class MedicoListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        medicoUser = Medico.objects.all()
        serializer = MedicoSerializer(medicoUser, many=True)
        return Response(serializer.data)

# Tabla Turno

class TurnoViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAdminUser,)
    queryset = Turno.objects.all()
    serializer_class = TurnoSerializer

class registrarTurno(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        serializer = TurnoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TurnoPorIdView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, id=None):
        turnoId = Turno.objects.get(id=id)
        serializer = RegistroDeConsultaSerializer(turnoId, many=True)
        return Response(serializer.data)
    
class TurnoPorPacienteView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, idt=None):
        turnoPorPaciente = Turno.objects.filter(id_paciente=idp)
        serializer = TurnoSerializer(turnoPorPaciente, many=True)
        return Response(serializer.data)

class TurnoPorMedicoView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, idt=None):
        turnoPorMedico = Turno.objects.filter(id_medico=idm)
        serializer = TurnoSerializer(turnoPorMedico, many=True)
        return Response(serializer.data)
    
class TurnoListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        turnoList = Turno.objects.all()
        serializer = TurnoSerializer(turnoList, many=True)
        return Response(serializer.data)

# ------------ API usuario token


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


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


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
        serializer = RegistroDeConsultaSerializer(registroDeConsultaId, many=True)
        return Response(serializer.data)
    
class RegistroDeConsultaPorTurnoView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, idt=None):
        registroDeConsultaTurno = RegistroDeConsulta.objects.filter(id_turno=idt)
        serializer = RegistroDeConsultaSerializer(registroDeConsultaTurno, many=True)
        return Response(serializer.data)
    
class RegistroDeConsultaListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        registroDeConsultaList = RegistroDeConsulta.objects.all()
        serializer = RegistroDeConsultaSerializer(registroDeConsultaList, many=True)
        return Response(serializer.data)
