export interface IPaciente {
  id?: number;
  dni_paciente?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  clave?: string;
  telefono?: string;
  foto?: string | any;
  is_active?: boolean;
  id_obra_social?: number;
  pacienteUser?: number;
}
