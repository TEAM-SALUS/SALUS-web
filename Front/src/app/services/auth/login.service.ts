import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError, map} from 'rxjs'
import { LoginRequest } from './loginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem('token')!=null);
    this.currentUserData = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  }

  login(credentials: LoginRequest): Observable <any>{  
    return this.http.post<any>('http://localhost:8000/api/v1/login' , credentials).pipe(
      map(userData => {
        sessionStorage.setItem('token', userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  }
  
  getProfile(){
    this.http.get<any>('http://localhost:8000/api/v1/profile').pipe(
      map(data => {
        sessionStorage.setItem('profile', JSON.stringify(data));
      })
    )
  }

  logout():void{
    sessionStorage.removeItem('token');
    this.currentUserLoginOn.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('se ha producido un error', error.error)
    }else{
      console.error('backend retorno el codigo de estado', error)
    }
    return throwError(() => new Error('algo fallo'))
  }
  
  get userData(): Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }
}