import { Component, OnInit } from '@angular/core';
import { Doctors } from 'src/app/model/doctor.model';
import { DoctorsService } from 'src/app/services/doctors.service';
import { Router } from '@angular/router';
import Swal from'sweetalert2';

@Component({
  selector: 'app-medicos-admin',
  templateUrl: './medicos-admin.component.html',
  styleUrls: ['./medicos-admin.component.css']
})
export class MedicosAdminComponent implements OnInit {

  myDoctors: Doctors[] = []
  doctor: Doctors = {
    id: 0,
    Nombre_UM: "",
    Apellido_UM: "",
    Dni_UM: "",
    Direccion_UM: "",
    Celular_UM: "",
    Localidad_UM: "",
    Matricula_UM: ""
  }

  constructor(private doctorsService: DoctorsService, private router: Router) {}

  ngOnInit(): void {
    this.doctorsService.getAllDoctors()
    .subscribe(data => {
      this.myDoctors = data
    })
  }

  editDoctor(data: Doctors){
    this.router.navigate(['/formDoctorEdit'], {state: {suscripcion: data}})
  }

  deleteDoctor(id: number){
    Swal.fire({
      title: 'Confirmar Eliminación',
      text: '¿Estás seguro de que deseas eliminar este Médico?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorsService.deleteDoctor(id)
          .subscribe(data => {
            const productIndex = this.myDoctors.findIndex(item => item.id === id);
            this.myDoctors.splice(productIndex, 1);
          });
      }
    });
  }

}
