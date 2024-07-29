import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/model/i-usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-form-usuario',
  templateUrl: './c-form-usuario.component.html',
  styleUrls: ['./c-form-usuario.component.css'],
})
export class CFormUsuarioComponent {
  public nuevoUsuario: IUsuario | any = {};

  public registroForm = this.formBuilder.group({
    password: ['', Validators.required],
    username: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    roles: ['is_active', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  public get password() {
    return this.registroForm.controls.password;
  }

  public get username() {
    return this.registroForm.controls.username;
  }

  public get first_name() {
    return this.registroForm.controls.first_name;
  }

  public get last_name() {
    return this.registroForm.controls.last_name;
  }

  public get email() {
    return this.registroForm.controls.email;
  }

  public get roles() {
    return this.registroForm.controls.roles;
  }

  public registrarUsuario() {
    if (this.registroForm.valid) {
      this.nuevoUsuario.password = this.password.value;
      this.nuevoUsuario.username = this.username.value;
      this.nuevoUsuario.first_name = this.first_name.value;
      this.nuevoUsuario.last_name = this.last_name.value;
      this.nuevoUsuario.email = this.email.value;
      switch (this.roles.value) {
        case 'is_superuser':
          this.nuevoUsuario.is_superuser = true;
          this.nuevoUsuario.is_staff = true;
          break;
        case 'is_staff':
          this.nuevoUsuario.is_superuser = false;
          this.nuevoUsuario.is_staff = true;
          break;

        default:
          this.nuevoUsuario.is_superuser = false;
          this.nuevoUsuario.is_staff = false;
          break;
      }
      this.nuevoUsuario.is_active = true;

      this.usuarioService.registrarUsuarioToken(this.nuevoUsuario).subscribe({
        next: (usuarioData) => {
          Swal.fire({
            icon: 'success',
            title: `Creado`,
            text: `Se ha agreagdo el usuario.`,
            timer: 3000,
          }).then(() => {
            this.registroForm.reset();
            window.location.reload();
          });
        },
        error: (errorData) => {
          console.error(errorData);
          this.registroForm.reset();
          Swal.fire('Error', 'No se pudo crear el usuario.', 'error');
        },
        complete: () => {},
      });
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}
