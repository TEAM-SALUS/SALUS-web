export interface Doctors {
  id: number,
  Nombre_UM: string,
  Apellido_UM: string,
  Celular_UM: string,
  Direccion_UM: string,
  Localidad_UM: string,
  Dni_UM: string,
  Matricula_UM: string,
}

export interface DoctorDTO extends Omit<Doctors, 'id'>{}
