import { Client } from "./client.model";
import { Suscription } from "./suscription.model";

export interface Ventas{
  id?: number,
  FechaVenta_V: Date,
  FechaFin_V?: Date,
  TotalVenta_V: number,
  id_UP: number,
  id_S: number,
  Nombre_UP?: string,
  Apellido_UP?: string,
  Dni_UP?: string,
  Email_UP?: string,
  Celular_UP?: string,
  Localidad_UP?: string,
  TipoServicio_S?:string,
  Precio_S?:number
}
