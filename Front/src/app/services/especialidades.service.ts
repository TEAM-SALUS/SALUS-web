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

  public getEspecialidad(): Observable<any>{
    return this.http.get(this.url);
  };

  public getEspecialidadId(id: number): Observable<EspecialidadInterface> {
    return this.http.get<EspecialidadInterface>(`${this.url}${id}`);
  };

  public getProfesionalesByEspecialidad(idEspecialidad: number): Observable<ProfesionalInterface[]> {
    return this.http.get<ProfesionalInterface[]>(`${this.url}?id_especialidad=${idEspecialidad}`);
  };

  /** Registra nueva especialidad */
  public registrarEspecialidad(nuevaEspecialidad:EspecialidadInterface|FormData):Observable<EspecialidadInterface> {
    console.info("servicio nuevaEspecialidad",nuevaEspecialidad);
    return this.http.post<EspecialidadInterface>(`${this.url}`,nuevaEspecialidad);
  }

  /** Edita especialidad */
  public editarEspecialidad(id:number,especialidad:EspecialidadInterface|FormData):Observable<EspecialidadInterface> {
    return this.http.put<EspecialidadInterface>(`${this.url}${id}/`,especialidad);
  }
  
  /** Elimina especialidad por id */
  public borrarEspecialidad(id:number|undefined):Observable<EspecialidadInterface> {
    return this.http.delete<EspecialidadInterface>(`${this.url}${id}`);
  }

};
