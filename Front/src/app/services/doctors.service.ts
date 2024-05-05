import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctors } from '../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  urlApi = "api/v1/usuariosmedicos/"

  constructor(
    private http: HttpClient
  ) { }

  getAllDoctors(){
    return this.http.get<Doctors[]>(this.urlApi)
  }

  getDoctor(id: number){
    return this.http.get<Doctors>(`${this.urlApi}/${id}`)
  }

  createDoctor(data:Partial<Doctors>){
    return this.http.post<Doctors>(this.urlApi, data);
  }

  updateDoctor(id:number, data:Partial<Doctors>){
    return this.http.put<Doctors>(`${this.urlApi}${id}/`, data);
  }

  deleteDoctor(id: number){
    return this.http.delete<boolean>(`${this.urlApi}${id}/`);
  }
}
