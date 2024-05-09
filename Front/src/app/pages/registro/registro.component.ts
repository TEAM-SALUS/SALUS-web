import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { RegistryService } from 'src/app/services/auth/registry.service';
import { RegistryRequest } from "../../services/auth/registryRequest";
import Swal from'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  
  loginError:string="";
  pacienteData: any = {};
  registryForm=this.formBuilder.group({
    first_name:["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
    last_name:["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
    dni:['', Validators.required],
    email:["", [Validators.required, Validators.minLength(4),Validators.email]],
    password:['',Validators.required],
    password2: [Validators.required],
    username:['', Validators.required]
  })

  constructor(private formBuilder:FormBuilder, private registryService: RegistryService, private router:Router){}
  
  ngOnInit(): void{}

  signup(){
    if(this.registryForm.valid){
      this.registryService.createUser(this.registryForm.value as RegistryRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
        },
        complete: () => {
          Swal.fire({
            icon:'success',
            title: `Usuario registrado con éxito!`
          })
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
}