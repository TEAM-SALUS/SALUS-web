export interface IMedico {
  id?: number;
  matricula?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  clave?: string;
  telefono?: string;
  foto?: string;
  is_active?: boolean;
  id_especialidad?: number;
  id_horario?: number;
  medicoUser?: number;
}
