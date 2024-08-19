export interface UserProfile {
  id: number;
  nombre?: string;
  apellido?: string;
  dni_paciente?: string;
  email?: string;
  clave?: string;
  telefono?: string;
  //foto?: string;
  pacienteUser?: number; 
}

export interface UserProfileConFoto {
  id: number;
  nombre?: string;
  apellido?: string;
  dni_paciente?: string;
  email?: string;
  clave?: string;
  telefono?: string;
  foto?: string;
  pacienteUser?: number; 
}