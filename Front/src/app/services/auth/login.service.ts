import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginRequest } from './loginRequest';
import { LoggedInUser } from './auth';
import { UsuarioDTO } from 'src/app/model/auth/usuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlApi:String = "http://localhost:8000/api/v1/";
  currentUserLoginOn: BehaviorSubject<boolean>;
  currentUserData: BehaviorSubject<any>;
  currentUserRol: BehaviorSubject<string>;
  currentUserId: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem('token') != null);
    this.currentUserData = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || "{}"));
    this.currentUserRol = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('rol') || "{}"));
    this.currentUserId = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('id') || "{}"))
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/v1/login', credentials).pipe(
      map(userData => {
        sessionStorage.setItem('token', userData.token);
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);

        console.info("userData.Token",userData.token);
        this.getUserProfile().subscribe({
          next:(usuarioDTO) => {
            console.info("usuarioDTO",usuarioDTO);
            sessionStorage.setItem('rol', onbeterRol(usuarioDTO));
            this.currentUserRol.next(onbeterRol(usuarioDTO));
            sessionStorage.setItem('id', obtenerId(usuarioDTO));
            this.currentUserId.next(obtenerId(usuarioDTO));
          }
        });

        //sessionStorage.setItem('rol', "paciente");
        //this.currentUserRol.next("paciente");
        return userData;
      }),
      catchError(this.handleError)
    );
  };

  getUserProfile(): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.urlApi}profile`);
  }
  
  getProfile(): Observable<LoggedInUser> {
    return this.http.get<LoggedInUser>('http://localhost:8000/api/v1/profile').pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.currentUserLoginOn.next(false);
    sessionStorage.removeItem('rol');
    this.currentUserRol.next("invitado");
    sessionStorage.removeItem('id');
    this.currentUserId.next("0")
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error:', error.error);
    } else {
      console.error('Backend retornó el código de estado', error.status, 'con el cuerpo:', error.error);
    }
    return throwError(() => new Error('Algo falló; por favor intente nuevamente.'));
  }
  
  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userRol(): Observable<string> {
    return this.currentUserRol.asObservable();
  }

  get userId(): Observable<string> {
    return this.currentUserId.asObservable();
  }
}

function onbeterRol(usuarioDTO: UsuarioDTO): string {
  if(usuarioDTO?.is_superuser){
    return "administrador";
  }
  else if(usuarioDTO?.is_staff){
    return "profesional";
  } else if(usuarioDTO?.is_active){
    return "paciente";
  }
  return "invitado";
}
function obtenerId(usuarioDTO: UsuarioDTO): string {
  if(usuarioDTO.id){
    return usuarioDTO.id;
  }
  return "";
}

