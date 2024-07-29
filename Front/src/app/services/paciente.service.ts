import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from './auth/paciente';
import { Observable } from 'rxjs';
import { IPaciente } from '../model/i-paciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  url: String = 'http://localhost:8000/api/v1/';

  constructor(private http: HttpClient) {}

  // Seccion admin
  /** @description Obtiene listado de Pacientes */
  public obtenerPacientes(): Observable<IPaciente[]> {
    return this.http.get<IPaciente[]>(`${this.url}paciente`);
  }

  /** @description Registra nuevo paciente */
  public registrarPaciente(
    paciente: Paciente | IPaciente | FormData
  ): Observable<Paciente | IPaciente> {
    return this.http.post<Paciente | IPaciente>(
      this.url + 'paciente-registro',
      paciente
    );
  }

  /** @description Elimina paciente por id */
  public borrarPaciente(id: number | undefined): Observable<null> {
    return this.http.delete<null>(`${this.url}paciente/${id}`);
  }

  /** @description Edita Pciente por id */
  public editarPaciente(
    id: number,
    paciente: IPaciente | FormData
  ): Observable<IPaciente> {
    return this.http.put<IPaciente>(`${this.url}paciente/${id}/`, paciente);
  }

  // Seccion paciente
  public obtenerPacientePorIdUsuario(id: number): Observable<IPaciente> {
    return this.http.get<IPaciente>(`${this.url}paciente-id-usuario/${id}`);
  }
}
