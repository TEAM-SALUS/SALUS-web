import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from './auth/paciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  url: String = "http://localhost:8000/api/v1/"

  constructor(private http:HttpClient) { }

  /* Registra Paciente */
  registrarPaciente(paciente:Paciente):Observable<Paciente>{
    return this.http.post<Paciente>(this.url+"paciente-registro",paciente);
  }
}
