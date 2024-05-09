import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  url: string = 'http://127.0.0.1:8000/api/v1/especialidad/'

  constructor(private http: HttpClient) {}

  public getEspecialidad(): Observable<any>{
    return this.http.get(this.url);
  };

  public getEspecialidadId(id:number): Observable<any>{
    return this.http.get(`${this.url}${id}/`);
  };

}
