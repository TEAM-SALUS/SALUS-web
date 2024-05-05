import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { RegistryService } from 'src/app/services/auth/registry.service';
import { HttpClient } from '@angular/common/http';
import { RegistryRequest } from "../../services/auth/registryRequest";
import { SharedServicesComponent } from 'src/app/services/auth/shared-services/shared-services.component';
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
    Nombre_UP:["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
    Apellido_UP:["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
    Email_UP:["", [Validators.required, Validators.minLength(4),Validators.email]],
    Clave_UP:['',Validators.required],
  })
  

  constructor(private formBuilder:FormBuilder, private registryService: RegistryService, private router:Router, private sharedService: SharedServicesComponent){}
  
  ngOnInit(): void{}

  registry(){
    if(this.registryForm.valid){
      this.registryService.checkEmail().subscribe(data => {
        const email = data.find(paciente => paciente.Email_UP === this.registryForm.value.Email_UP)
        if (email) {
          Swal.fire({
            icon:'warning',
            title: `Usuario inválido`,
            text: `Este mail ya está siendo utilizado por uno de nuestros usuarios.`
          })
        } else {
          this.registryService.createUser(this.registryForm.value as RegistryRequest).subscribe(data => {
            this.sharedService.isRegistered = true;
            this.pacienteData = data;
            localStorage.setItem('pacienteData', JSON.stringify(this.pacienteData));
            Swal.fire({
              icon:'success',
              title: `Usuario registrado con éxito!`,
              
            })
            setTimeout(() => {
              this.router.navigateByUrl('/home');
            }, 3000);
        })
        }
      })
    }
  }
}