import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ventas } from '../model/venta.model';
@Injectable({
  providedIn: 'root'
})
export class VentaService {

  urlApi = "api/v1/ventas/"

  constructor(private http: HttpClient){}

  getAllVentas(){
    return this.http.get<Ventas[]>(this.urlApi)
  }

  getVenta(id: number){
    return this.http.get<Ventas>(`${this.urlApi}/${id}`)
  }

  createVenta(data:Partial<Ventas>){
    return this.http.post<Ventas>(this.urlApi, data);
  }
}
