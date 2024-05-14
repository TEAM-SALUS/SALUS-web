import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { RegistryService } from 'src/app/services/auth/registry.service';
import { RegistryRequest } from "../../services/auth/registryRequest";
import { RegistroUserDTO } from 'src/app/model/registroUserDTO';
import { Paciente } from 'src/app/services/auth/paciente';
import Swal from'sweetalert2';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  info:any;
  paciente:Paciente|any={
    dni_paciente: '',
    nombre: '',
    apellido: '',
    email: '',
    clave: '',
    telefono: '',
    pacienteUser: ''
  };
  
  loginError:string="";
  registryForm=this.formBuilder.group({
    first_name:["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
    last_name:["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
    dni:['', Validators.required],
    email:["", [Validators.required, Validators.minLength(4),Validators.email]],
    password:['',Validators.required],
    password2: [Validators.required],
    username:['', Validators.required],
    number:['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]]
  })


  

  constructor(private formBuilder:FormBuilder, private registryService: RegistryService, private router:Router,private pacienteService:PacienteService){}

  signup(){
    if(this.registryForm.valid){
      this.registryService.createUser(this.registryForm.value as RegistryRequest).subscribe({
        next: (usuarioData) => {
          this.info = sessionStorage.getItem('userData');
          this.info = JSON.parse(this.info);

          this.paciente.nombre = this.First_name;
          this.paciente.apellido = this.Last_name;
          this.paciente.dni_paciente = this.Dni;
          this.paciente.telefono = this.Number;
          this.paciente.email = this.Email;
          this.paciente.clave = this.Password;
          this.paciente.pacienteUser = this.info.user.id;
        },
        error: (errorData) => {
          console.error(errorData);
        },
        complete: () => {
          console.log(this.paciente);
          Swal.fire({
            icon:'success',
            title: `Usuario registrado con éxito!`
          });
          this.agregarPaciente();
          sessionStorage.removeItem('userData');
          console.info('Registro completo');
          this.router.navigateByUrl('/login');
          this.registryForm.reset();
        }
      })
    }else{
      this.registryForm.markAllAsTouched();
      alert("Error al ingresar los datos")
    }
  }

/*
  registry(){
    if(this.registryForm.valid){
      this.registryService.createUser(this.registryForm.value as RegistryRequest).subscribe(data => {
        Swal.fire({
          icon:'success',
          title: `Usuario registrado con éxito!`
        })
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 3000);
      })
    }
  }
*/

  /* Agregar Paciente */
  private agregarPaciente(){
    this.pacienteService.registrarPaciente(this.paciente).subscribe({
      next: (pacienteData) => {
        console.info("Enviando paciente a registrar:",pacienteData.nombre);
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
      }
    });
  };

  get First_name(){
    return this.registryForm.get("first_name")?.value;
  }
  get Last_name(){
    return this.registryForm.get("last_name")?.value;
  }
  get Dni(){
    return this.registryForm.get("dni")?.value;
  }
  get Number(){
    return this.registryForm.get("number")?.value;
  }
  get Email(){
    return this.registryForm.get("email")?.value;
  }
  get Username(){
    return this.registryForm.get("username")?.value;
  }
  get Password(){
    return this.registryForm.get("password")?.value;
  }
}