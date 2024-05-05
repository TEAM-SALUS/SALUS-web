import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorsService } from 'src/app/services/doctors.service';
import { DoctorDTO, Doctors } from 'src/app/model/doctor.model';

@Component({
  selector: 'app-form-doctor',
  templateUrl: './form-doctor.component.html',
  styleUrls: ['./form-doctor.component.css']
})
export class FormDoctorComponent {

  constructor(private formBuilder: FormBuilder, private router: Router, private doctorsService: DoctorsService, private route: ActivatedRoute) { }
  auxDni: string = "";
  auxCel: string = "";
  suscriptionId: number = 0;

  formDoctor = this.formBuilder.group({
    Nombre_UM: ["", [Validators.required, Validators.maxLength(25), Validators.minLength(3), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
    Apellido_UM: ["", [Validators.required, Validators.maxLength(25), Validators.minLength(3), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
    Direccion_UM: ["", [Validators.required, Validators.maxLength(35), Validators.minLength(5)]],
    Localidad_UM: ["", [Validators.required, Validators.maxLength(25), Validators.minLength(4), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
    Dni_UM: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]+$/)]],
    Celular_UM: ["", [Validators.required, Validators.maxLength(15), Validators.minLength(8), Validators.pattern(/^[0-9]+$/)]],
    Matricula_UM: ["", [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern(/^[0-9]+$/)]],
  })

  get Nombre_UM() {
    return this.formDoctor.controls.Nombre_UM
  }

  get Apellido_UM() {
    return this.formDoctor.controls.Apellido_UM
  }

  get Direccion_UM() {
    return this.formDoctor.controls.Direccion_UM
  }

  get Localidad_UM() {
    return this.formDoctor.controls.Localidad_UM
  }

  get Dni_UM() {
    return this.formDoctor.controls.Dni_UM
  }

  get Celular_UM() {
    return this.formDoctor.controls.Celular_UM
  }

  get Matricula_UM() {
    return this.formDoctor.controls.Matricula_UM
  }


  nuevoDoctor() {
    if (this.formDoctor.valid) {

      const data = this.formDoctor.value

      const doctor: Partial<Doctors> = {
        Nombre_UM: JSON.stringify(data.Nombre_UM).replace(/"/g, ''),
        Apellido_UM: JSON.stringify(data.Apellido_UM).replace(/"/g, ''),
        Direccion_UM: JSON.stringify(data.Direccion_UM).replace(/"/g, ''),
        Localidad_UM: JSON.stringify(data.Localidad_UM).replace(/"/g, ''),
        Dni_UM: JSON.stringify(data.Dni_UM).replace(/"/g, ''),
        Celular_UM: JSON.stringify(data.Celular_UM).replace(/"/g, ''),
        Matricula_UM: JSON.stringify(data.Matricula_UM).replace(/"/g, '')
      }

      this.doctorsService.createDoctor(doctor)
      .subscribe(data => {
        console.log(data)
      })


      //   .subscribe(data => {
      //     console.log(data)
      //   })

      this.router.navigateByUrl('/adminMedico');
      this.formDoctor.reset();
    } else {
      this.formDoctor.markAllAsTouched();
    }
  }
}
