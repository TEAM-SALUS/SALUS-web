import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from'sweetalert2';
import { SharedServicesComponent } from 'src/app/services/auth/shared-services/shared-services.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  apiUrl = '/api/v1/usuariospacientes/';
  formulario!: FormGroup;

  pacienteData: any = {};

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private sharedService: SharedServicesComponent) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      Nombre_UP: [''],
      Apellido_UP: [''],
      Email_UP: [''],
     
    });

    const pacienteDataString = localStorage.getItem('pacienteData');
    if (pacienteDataString) {
      this.pacienteData = JSON.parse(pacienteDataString);
      this.cargarPaciente();
    }
  }

  cargarPaciente() {
    if (this.pacienteData.id) {
      const url = `${this.apiUrl}${this.pacienteData.id}`;
      this.http.get<any>(url).subscribe(data => {
        this.pacienteData = data;
        console.log('Paciente cargado:', data);


        this.formulario.patchValue({
          Nombre_UP: this.pacienteData.Nombre_UP,
          Apellido_UP: this.pacienteData.Apellido_UP,
          Email_UP: this.pacienteData.Email_UP,
          
        });
      });
    } else {
      console.log('id undefined');
    }
  }


  actualizarPaciente() {
    const valores = this.formulario.value;
    this.pacienteData = {
      ...this.pacienteData,
      ...valores
    };
    const url = `${this.apiUrl}${this.pacienteData.id}/`;
    this.http.put<any>(url, this.pacienteData).subscribe(response => {
      console.log('Paciente actualizado:', response);
    });
  }

  

  eliminarPaciente() {
    Swal.fire({
      title: 'Está seguro que desea eliminar su usuario?',
      text: "No hay vuelta atrás!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Usuario eliminado',
          'Your file has been deleted.',
          'success'
        )
        const url = `${this.apiUrl}/${this.pacienteData.id}/`;
        this.http.delete<any>(url).subscribe(response => {
        localStorage.removeItem('pacienteData');
        this.sharedService.isRegistered = false;
        this.sharedService.isLoggedIn = false;
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 1500);
       });
      }
    })
    
  }
}
