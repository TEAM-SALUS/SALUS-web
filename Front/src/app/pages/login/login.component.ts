import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { HttpClient } from '@angular/common/http';
import { User } from "../../services/auth/user";
import { SharedServicesComponent } from 'src/app/services/auth/shared-services/shared-services.component';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import Swal from'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  myUsers: User[] = [];
  loginError:string="";
  pacienteData: any = {};
  loginForm=this.formBuilder.group({
    email:["", [Validators.required, Validators.minLength(4),Validators.email]],
    password:['',Validators.required],
  })
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService, private http: HttpClient, private sharedService: SharedServicesComponent){}

  ngOnInit(): void{}

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.login().subscribe(data => {
        this.myUsers = data
       const user = this.myUsers.find((user) => {
        return this.loginForm.value.email === user.Email_UP
      })
        if(user){
          if (user.Clave_UP === this.loginForm.value.password) {
              if (user.Email_UP === "admin@admin.com") {
                this.sharedService.isAdmin = true;
              }
              this.sharedService.isLoggedIn = true;
              this.pacienteData = user;
              localStorage.setItem('pacienteData', JSON.stringify(this.pacienteData));
              this.router.navigateByUrl('/home');
          } else {
            Swal.fire({
              icon:'warning',
              title: `Contraseña inválida.`,
              text: `Introduzca la contraseña correcta.`
            })
          }
        } else {
          Swal.fire({
            icon:'warning',
            title: `Usuario no registrado.`,
            text: `Introduzca el usuario correcto.`
          })
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
      Swal.fire({
        icon:'warning',
        title: `Los datos son incorrectos.`,
        text: `Por favor verifique los datos.`
      })
    }
  }


}
