import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError} from 'rxjs'
import { RegistryRequest } from './registryRequest';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  constructor(private http: HttpClient) { }

  
  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('se ha producido un error', error.error)
    }else{
      console.error('backend retorno el codigo de estado', error.status, error.error)
    }
    return throwError(() => new Error('algo fallo'))
  }

  checkEmail(){
    const url = "/api/v1/usuariospacientes/"
    return this.http.get<User[]>(url)

  }
  
  createUser(data:RegistryRequest){
    const url = "/api/v1/usuariospacientes/"
    return this.http.post<RegistryRequest>(url, data);
  }
}
