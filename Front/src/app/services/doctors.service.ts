import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctors } from '../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  updateDoctor(id: number, doctor: Doctors) {
    throw new Error('Method not implemented.');
  }

  urlApi = "api/v1/usuariosmedicos/"
  createDoctor: any;

}
