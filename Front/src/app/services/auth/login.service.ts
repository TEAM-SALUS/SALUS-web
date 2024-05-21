import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginRequest } from './loginRequest';
import { LoggedInUser } from './auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(sessionStorage.getItem('token') != null);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem('token') != null);
    this.currentUserData = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  }

  login(credentials: LoginRequest): Observable<any> {  
    return this.http.post<any>('http://localhost:8000/api/v1/login', credentials).pipe(
      map(userData => {
        sessionStorage.setItem('token', userData.token);
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
        return userData;
      }),
      catchError(this.handleError)
    );
  }
  
  getProfile(): Observable<LoggedInUser> {
    return this.http.get<LoggedInUser>('http://localhost:8000/api/v1/profile').pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.currentUserLoginOn.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error:', error.error);
    } else {
      console.error('Backend retornó el código de estado', error.status, 'con el cuerpo:', error.error);
    }
    return throwError(() => new Error('Algo falló; por favor intente nuevamente.'));
  }
  
  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }
}