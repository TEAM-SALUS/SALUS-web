import { Injectable } from '@angular/core';
import { IObraSocial } from '../model/i-obra-social';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ObraSocialService {
  url: string = 'http://localhost:8000/api/v1/';

  constructor(private http: HttpClient) {}

  /** @description Obtiene listado de Obras Sociales */
  public obtenerObrasSociales(): Observable<IObraSocial[]> {
    return this.http.get<IObraSocial[]>(`${this.url}obra-social`);
  }

  /** @description Registra nueva obra social */
  public registrarObraSocial(
    nuevaObraSocial: IObraSocial | FormData
  ): Observable<IObraSocial> {
    return this.http.post<IObraSocial>(
      `${this.url}obra-social/`,
      nuevaObraSocial
    );
  }

  /**  @description Elimina obra social por id*/
  public borrarObraSocial(id: number | undefined): Observable<null> {
    return this.http.delete<null>(`${this.url}obra-social/${id}`);
  }

  /** @description Edita Obra social por id*/
  public editarObraSocial(
    id: number,
    obraSocial: IObraSocial | FormData
  ): Observable<IObraSocial> {
    return this.http.put<IObraSocial>(
      `${this.url}obra-social/${id}/`,
      obraSocial
    );
  }
}
