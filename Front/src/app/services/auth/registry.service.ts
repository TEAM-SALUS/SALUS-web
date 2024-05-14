import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError} from 'rxjs'
import { RegistryRequest } from './registryRequest';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  info: any;

  constructor(private http: HttpClient) { }
  
  createUser(data:RegistryRequest): Observable<any>{
    const url = "http://localhost:8000/api/v1/registro";
    return this.http.post<any>(url, data).pipe(
      map(userData => {
        sessionStorage.setItem('userData', JSON.stringify(userData));
        this.info = sessionStorage.getItem("userData")
        this.info = this.info = JSON.parse(this.info);
        sessionStorage.setItem('token', this.info.token);
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('se ha producido un error', error.error)
    }else{
      console.error('backend retorno el codigo de estado', error.status, error.error)
    }
    return throwError(() => new Error('algo fallo'))
  }
  
}
