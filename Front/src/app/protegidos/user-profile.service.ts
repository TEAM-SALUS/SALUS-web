import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UserProfile, UserProfileConFoto } from './interfaces/user-profile';
import { LoggedInUser } from '../services/auth/auth';
import { Update } from '../services/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  url: string = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<LoggedInUser> {
    return this.http.get<LoggedInUser>('http://localhost:8000/api/v1/profile').pipe(
      catchError(this.handleError)
    );
  }

  deleteProfile(): Observable<LoggedInUser> {
    return this.http.delete<LoggedInUser>('http://localhost:8000/api/v1/profile').pipe(
      catchError(this.handleError)
    );
  }

  updateProfile(id: string, UserProfile:UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`http://localhost:8000/api/v1/profile/${id}/`, UserProfile).pipe(
      catchError(this.handleError)
    );
  }

  getUserProfile(id: string | null): Observable<any> {
    return this.http.get(`${this.url}/paciente-user/${id}`);
  }

  getUserProfileFoto(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.url}/paciente-user/${id}`);
  }

  eliminarPerfil(id: string | null): Observable<any> {
    return this.http.delete(`${this.url}/paciente-user/${id}`);
  }

  actualizarPerfil(pacienteUser: string | null,  UserProfile:UserProfile): Observable<UserProfile> {
    console.info("datos paciente a actualizar",UserProfile);
    return this.http.put<UserProfile>(`http://localhost:8000/api/v1/paciente-user/${pacienteUser}`,UserProfile).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error:', error.error);
    } else {
      console.error('Backend retornó el código de estado', error.status, 'con el cuerpo:', error.error);
    }
    return throwError(() => new Error('Algo falló; por favor intente nuevamente.'));
  }
}
