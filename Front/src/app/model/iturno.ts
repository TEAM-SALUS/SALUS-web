import { EstadoTurno } from "../enums/estado-turno";

export interface ITurno {
  id?: number;
  fecha?: string;
  horario?: string;
  pagado?: boolean;
  estado?: EstadoTurno;
  id_medico?: number;
  id_paciente?: number|string|null;
}
