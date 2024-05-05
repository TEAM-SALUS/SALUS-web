import { Component, OnInit } from '@angular/core';
import { Doctors } from 'src/app/model/doctor.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'app-form-edit-doctor',
  templateUrl: './form-edit-doctor.component.html',
  styleUrls: ['./form-edit-doctor.component.css']
})
export class FormEditDoctorComponent implements OnInit {

  doctorFormEdit: FormGroup = new FormGroup({});
  idAuxiliar: number = 0;
  doctorActual: Doctors = {
    id: 0,
    Nombre_UM: "",
    Apellido_UM: "",
    Direccion_UM: "",
    Localidad_UM: "",
    Celular_UM: "",
    Dni_UM:"",
    Matricula_UM:""
  };

  constructor(private formBuilder: FormBuilder, private router: Router, private doctorsService:DoctorsService){}

  ngOnInit(): void {
    this.doctorActual = history.state.suscripcion
    this.idAuxiliar = this.doctorActual.id

    this.doctorFormEdit = this.formBuilder.group({
      Nombre_UM: [this.doctorActual.Nombre_UM, [Validators.required, Validators.maxLength(25), Validators.minLength(3), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
      Apellido_UM: [this.doctorActual.Apellido_UM, [Validators.required, Validators.maxLength(25), Validators.minLength(3), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
      Direccion_UM: [this.doctorActual.Direccion_UM, [Validators.required, Validators.maxLength(35), Validators.minLength(5)]],
      Localidad_UM: [this.doctorActual.Localidad_UM, [Validators.required, Validators.maxLength(25), Validators.minLength(4), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
      Dni_UM: [this.doctorActual.Dni_UM, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]+$/)]],
      Celular_UM: [this.doctorActual.Celular_UM, [Validators.required, Validators.maxLength(15), Validators.minLength(8), Validators.pattern(/^[0-9]+$/)]],
      Matricula_UM: [this.doctorActual.Matricula_UM, [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern(/^[0-9]+$/)]],
    })
  }

  get Nombre_UM() {
    return this.doctorFormEdit.get('Nombre_UM')
  }

  get Apellido_UM() {
    return this.doctorFormEdit.get('Apellido_UM')
  }

  get Direccion_UM() {
    return this.doctorFormEdit.get('Direccion_UM')
  }

  get Localidad_UM() {
    return this.doctorFormEdit.get('Localidad_UM')
  }

  get Dni_UM() {
    return this.doctorFormEdit.get('Dni_UM')
  }

  get Celular_UM() {
    return this.doctorFormEdit.get('Celular_UM')
  }

  get Matricula_UM() {
    return this.doctorFormEdit.get('Matricula_UM')
  }

  editarDoctor() {
    if (this.doctorFormEdit.valid) {
      const data = this.doctorFormEdit.value

      const doctor: Doctors = {
        id: this.idAuxiliar,
        Nombre_UM: JSON.stringify(data.Nombre_UM).replace(/"/g, ''),
        Apellido_UM: JSON.stringify(data.Apellido_UM).replace(/"/g, ''),
        Direccion_UM: JSON.stringify(data.Direccion_UM).replace(/"/g, ''),
        Localidad_UM: JSON.stringify(data.Localidad_UM).replace(/"/g, ''),
        Dni_UM: JSON.stringify(data.Dni_UM).replace(/"/g, ''),
        Celular_UM: JSON.stringify(data.Celular_UM).replace(/"/g, ''),
        Matricula_UM: JSON.stringify(data.Matricula_UM).replace(/"/g, '')
      }

      this.doctorsService.updateDoctor(doctor.id, doctor)
        .subscribe(data => {
          console.log(data)
        })

      this.router.navigateByUrl('/adminMedico');
      this.doctorFormEdit.reset();
    }
    else {
      this.doctorFormEdit.markAllAsTouched();
    }
  }


}
