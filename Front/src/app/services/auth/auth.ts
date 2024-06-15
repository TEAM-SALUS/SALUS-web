export interface UserCredentials {
    username: string,
    password: string,
  }
 
  export interface LoggedInUser {
    id: number,
    //token: string,
    username: string
    pacienteUser: number
    idpu: number
  }

export interface Update {
  apellido: string;
  clave: string;
  dni_paciente: string;
  email: string;
  foto: string;
  nombre: string;
  telefono: string;
  idpu: number
  id: number,
}