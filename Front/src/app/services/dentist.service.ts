import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Dentist } from '../model/dentist.model';

@Injectable({
  providedIn: 'root'
})
export class DentistService {

  urlApi = "https://my-json-server.typicode.com/GastonSca/db-json/dentistas"

  constructor(
    private http: HttpClient
  ) { }

  getAllDentists(){
    return this.http.get<Dentist[]>(this.urlApi)
  }

  getDentist(id: string){
    return this.http.get<Dentist>(`${this.urlApi}/${id}`)
  }
}
