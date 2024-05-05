import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Client } from './../model/client.model'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  urlApi = "api/v1/usuariospacientes/"

  constructor(
    private http: HttpClient
  ) { }

  getAllClients(){
    return this.http.get<Client[]>(this.urlApi)
  }

  getClient(id: number){
    return this.http.get<Client>(`${this.urlApi}/${id}`)
  }

}

