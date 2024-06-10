import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITurno } from '../model/iturno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  url: string = "http://localhost:8000/api/v1/";

  constructor(private http: HttpClient) { }

  /** Obtiene listado de Turnos */
  public obtenerTurnos(): Observable<ITurno[]>{
    return this.http.get<ITurno[]>(`${this.url}turno-lista`);
  }

  /** Registra nuevo turno */
  public registrarTurno(nuevoTurno:ITurno):Observable<ITurno>{
    return this.http.post<ITurno>(`${this.url}registrarturno`,nuevoTurno);
  }
}
