import { EEstadoPago } from '../enums/e-estado-pago';

export interface IPago {
  id?: number;
  monto?: number | string;
  fecha?: string;
  hora?: string;
  estado?: EEstadoPago;
  is_active?: boolean;
  id_turno?: number;
}
