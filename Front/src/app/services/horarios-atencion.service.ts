import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HorarioAtencionInterface } from '../model/horarios-atencion';

@Injectable({
  providedIn: 'root'
})
export class HorariosAtencionService {
  url: string = 'http://127.0.0.1:8000/api/v1/horariodeatencion/'

  constructor(private http: HttpClient) { };

  public getHorarioAtencion(): Observable<HorarioAtencionInterface[]> {
    return this.http.get<HorarioAtencionInterface[]>(this.url);
  };

  public getHorarioAtencionId(id:number) : Observable<HorarioAtencionInterface> {
    return this.http.get<HorarioAtencionInterface>(`${this.url}${id}`);
  };

  public getProfesionalXHorario(id_horario: number) : Observable<HorarioAtencionInterface[]>{
    return this.http.get<HorarioAtencionInterface[]>(`${this.url}?id_horario=${id_horario}`);
  };

}
