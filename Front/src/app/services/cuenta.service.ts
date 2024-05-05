import { Injectable } from '@angular/core';
import { Cuenta, CreateCuentaDTO, UpdateCuentaDTO } from '../model/cuenta.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {



  urlApi = "api/v1/cuentas/"

  constructor(private http: HttpClient) { }


  getCuentas(){
    return this.http.get<Cuenta[]>(this.urlApi)
  }

  crearCuenta(){
    const cuenta: UpdateCuentaDTO = {
      Saldo_C: 0
    }
    console.log(cuenta)
    return this.http.post<Cuenta>(`${this.urlApi}/1`,cuenta)

  }

}
