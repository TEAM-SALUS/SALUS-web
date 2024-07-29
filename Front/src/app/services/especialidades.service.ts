import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EspecialidadInterface } from '../model/especialidad';
import { ProfesionalInterface } from '../model/profesional';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  url: string = 'http://localhost:8000/api/v1/especialidad/'

  constructor(private http: HttpClient) {}

  /** @description Obtiene listado de Especialidades */
  public getEspecialidad(): Observable<EspecialidadInterface[]>{
    return this.http.get<EspecialidadInterface[]>(this.url);
  };

  /** @description Obtiene Especialidade por id */
  public getEspecialidadId(id: number): Observable<EspecialidadInterface> {
    return this.http.get<EspecialidadInterface>(`${this.url}${id}`);
  };

  /** @description Obtiene Especialidades por id?*/
  public getProfesionalesByEspecialidad(idEspecialidad: number): Observable<ProfesionalInterface[]> {
    return this.http.get<ProfesionalInterface[]>(`${this.url}?id_especialidad=${idEspecialidad}`);
  };

  /** @description Registra nueva especialidad */
  public registrarEspecialidad(nuevaEspecialidad:EspecialidadInterface|FormData):Observable<EspecialidadInterface> {
    console.info("servicio nuevaEspecialidad",nuevaEspecialidad);
    return this.http.post<EspecialidadInterface>(`${this.url}`,nuevaEspecialidad);
  }

  /** @description Edita especialidad por id */
  public editarEspecialidad(id:number,especialidad:EspecialidadInterface|FormData):Observable<EspecialidadInterface> {
    return this.http.put<EspecialidadInterface>(`${this.url}${id}/`,especialidad);
  }
  
  /** @description Elimina especialidad por id */
  public borrarEspecialidad(id:number|undefined):Observable<EspecialidadInterface> {
    return this.http.delete<EspecialidadInterface>(`${this.url}${id}`);
  }

};
