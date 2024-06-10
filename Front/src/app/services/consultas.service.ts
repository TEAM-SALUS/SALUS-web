import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConsulta } from '../model/iconsulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  url: string = "http://localhost:8000/api/v1/";

  constructor(private http: HttpClient) { }

  /** Obtiene listado de Consultas */
  public obtenerConsultas(): Observable<IConsulta[]>{
    return this.http.get<IConsulta[]>(`${this.url}registrodeconsulta-lista`);
  }
}
