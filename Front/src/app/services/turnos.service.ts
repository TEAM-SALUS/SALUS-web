import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITurno } from '../model/iturno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  url: string = 'http://localhost:8000/api/v1/';

  constructor(private http: HttpClient) {}

  /** @description Obtiene listado de Turnos */
  public obtenerTurnos(): Observable<ITurno[]> {
    return this.http.get<ITurno[]>(`${this.url}turno-lista`);
  }

  /** @description Obtiene turno por id */
  public obtenerTurnoId(id: number): Observable<ITurno> {
    return this.http.get<ITurno>(`${this.url}turno-id/${id}`);
  }

  /** @description Registra nuevo turno */
  public registrarTurno(nuevoTurno: ITurno): Observable<ITurno> {
    return this.http.post<ITurno>(`${this.url}registrarturno`, nuevoTurno);
  }

  /** @description Elimina turno por id */
  public borrarTurno(id: number | undefined): Observable<null> {
    return this.http.delete<null>(`${this.url}turno-id/${id}`);
  }

  /** @describe Edita rutno por id */
  public editarTurno(id: number, turno: ITurno): Observable<ITurno> {
    return this.http.put<ITurno>(`${this.url}turno-id/${id}`, turno);
  }

  // medico
  /** @description Obtiene turnos por medico */
  public obtenerTurnosMedico(id: number): Observable<ITurno[]> {
    return this.http.get<ITurno[]>(`${this.url}turno-medico/${id}`);
  }

  // paciente
  /** @description Obtiene turnos por paciente */
  public obtenerTurnosPaciente(id: number): Observable<ITurno[]> {
    return this.http.get<ITurno[]>(`${this.url}turno-paciente/${id}`);
  }

}
