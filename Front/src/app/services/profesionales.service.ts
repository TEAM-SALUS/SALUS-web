import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfesionalInterface } from '../model/profesional';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {
  url: string = 'http://localhost:8000/api/v1/'

  constructor(private http: HttpClient) { }

  /** @description Obtiene listado de profesionales */
  public getProfesionales(): Observable<ProfesionalInterface[]>{
    return this.http.get<ProfesionalInterface[]>(`${this.url}medico-lista`);
  };
  /** @description Obtiene profesional por id @author Grupo SALUS+ @argument id integer medico @returns medico @version 1 @copyright &copy; &#169; SALUS+® */
  public getProfesionalId(id:number):Observable<ProfesionalInterface>{
    return this.http.get<ProfesionalInterface>(`${this.url}medico-id/${id}`);
  }
  /** @description Obtiene profesional por usuario */
  public getProfesionalPorUsuario(idmu:number):Observable<ProfesionalInterface[]>{
    return this.http.get<ProfesionalInterface[]>(`${this.url}medico-user/${idmu}`);
  }
  /** @description Obtiene listado de profesionales por especialidad */
  public getProfesionalesByEspecialidad(ide: number): Observable<ProfesionalInterface[]> {
  return this.http.get<ProfesionalInterface[]>(`${this.url}medico-especialidad/${ide}`);
  };
};

