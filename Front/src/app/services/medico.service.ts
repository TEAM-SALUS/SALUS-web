import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMedico } from '../model/i-medico';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  url: String = 'http://localhost:8000/api/v1/';

  public constructor(private http: HttpClient) {}

  // Seccion admin
  /** @description Obtiene listado de Medicos */
  public obtenerMedicos(): Observable<IMedico[]> {
    return this.http.get<IMedico[]>(`${this.url}medico`);
  }

  /** @description Obtiene listado de Medicos */
  public obtenerMedicosId(id:number): Observable<IMedico> {
    return this.http.get<IMedico>(`${this.url}medico/${id}`);
  }

  /** @description Registra nuevo medico */
  public registrarMedico(medico: IMedico | FormData): Observable<IMedico> {
    return this.http.post<IMedico>(`${this.url}medico/`, medico);
  }

  /** @description Elimina medico por id */
  public borrarMedico(id: number | undefined): Observable<null> {
    return this.http.delete<null>(`${this.url}medico/${id}`);
  }

  /** @describe Edita medico por id */
  public editarMedico(id: number, medico: IMedico | FormData) {
    return this.http.put<IMedico>(`${this.url}medico/${id}/`, medico);
  }

  // Seccion medico
  public obtenerMedicoPorIdUsuario(id: number): Observable<IMedico> {
    return this.http.get<IMedico>(`${this.url}medico-id-usuario/${id}`);
  }
}
