import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CreateSuscriptionDTO, Suscription } from '../model/suscription.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {

  // urlApi = "https://my-json-server.typicode.com/GastonSca/db-json/suscripciones"
  urlApi = "api/v1/servicios/"

  constructor(
    private http: HttpClient
  ) { }

  getAllSuscriptions(){
    return this.http.get<Suscription[]>(this.urlApi)
    .pipe(
      map(suscripciones => suscripciones.map(item => {
        return{
          ...item,
          DescripcionList: item.Descripcion_S.split(";"),
          DescripcionAdmin: item.Descripcion_S.replaceAll(";", ", ")
        }
      }))
    )
  }

  getSuscription(id: number){
    return this.http.get<Suscription>(`${this.urlApi}/${id}`)
  }

  editSuscription(data: Suscription){
    return data
  }

  createSuscription(data:Partial<Suscription>){
    return this.http.post<Suscription>(this.urlApi, data);
  }

  updateSuscription(id:number, data:Partial<Suscription>){
    console.log("info que llega al put")
    console.log(data)
    return this.http.put<Suscription>(`${this.urlApi}${id}/`, data);
  }

  deleteSuscription(id: number){
    return this.http.delete<boolean>(`${this.urlApi}${id}/`);
  }
}
