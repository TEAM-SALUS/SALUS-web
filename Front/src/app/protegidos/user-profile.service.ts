import { Injectable } from '@angular/core';
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  url: string = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) { }

  getUserProfile(id: string|null): Observable<any> {
    return this.http.get(`${this.url}/paciente-user/${id}`);
  }
}