import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HorarioAtencionInterface } from '../model/horarios-atencion';

@Injectable({
  providedIn: 'root',
})
export class HorariosAtencionService {
  url: string = 'http://localhost:8000/api/v1/';

  constructor(private http: HttpClient) {}

  /** @description Obtiene listado de horarios de atenciones */
  public getHorarioAtencion(): Observable<HorarioAtencionInterface[]> {
    return this.http.get<HorarioAtencionInterface[]>(
      `${this.url}horario-de-atencion`
    );
  }

  /** Obtiene horario de atencion por id */
  public getHorarioAtencionId(
    id: number | undefined
  ): Observable<HorarioAtencionInterface> {
    return this.http.get<HorarioAtencionInterface>(
      `${this.url}horario-de-atencion/${id}`
    );
  }

  /** @description Obtiene horario de atencion por id */
  public getProfesionalXHorario(
    id_horario: number
  ): Observable<HorarioAtencionInterface[]> {
    return this.http.get<HorarioAtencionInterface[]>(
      `${this.url}horario-de-atencion/?id_horario=${id_horario}`
    );
  }

  /** @description Registra nuevo horario de atencion */
  public registrarHorarioDeAtencion(
    nuevoHorarioDeAtencion: HorarioAtencionInterface
  ): Observable<HorarioAtencionInterface> {
    return this.http.post<HorarioAtencionInterface>(
      `${this.url}horario-de-atencion/`,
      nuevoHorarioDeAtencion
    );
  }

  /** @description Elimina horario de atencion por id */
  public borrarHorarioDeAtencion(
    id: number | undefined
  ): Observable<HorarioAtencionInterface> {
    return this.http.delete<HorarioAtencionInterface>(
      `${this.url}horario-de-atencion/${id}`
    );
  }

  /** @description Edita horario de atencion por id */
  public editarHorarioDeAtencion(
    id: number,
    horarioDeAtencion: HorarioAtencionInterface
  ): Observable<HorarioAtencionInterface> {
    return this.http.put<HorarioAtencionInterface>(
      `${this.url}horario-de-atencion/${id}/`,
      horarioDeAtencion
    );
  }
}
