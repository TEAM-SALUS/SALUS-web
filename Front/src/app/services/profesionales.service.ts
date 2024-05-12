import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfesionalInterface } from '../model/profesional';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {
  url: string = 'http://127.0.0.1:8000/api/v1/medico/'
  profesionalLista: ProfesionalInterface[] = [];

  constructor(private http: HttpClient) { }

  public getProfesionales(): Observable<any>{
    return this.http.get(this.url);
  };


  // getProfesional(): Observable<any>{
  //   return this.http.get(this.url)
  // }

  public getProfesionalPorEspecialidad(id:number): Observable<any>{
    return this.http.get(`${this.url}${id}/`)
  };

  public getProfesionalesByEspecialidad(idEspecialidad: number): Observable<ProfesionalInterface[]> {
    return this.http.get<ProfesionalInterface[]>(`${this.url}?id_especialidad=${idEspecialidad}`);
  }


}

