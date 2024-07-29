import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/model/i-usuario';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-perfil-edit-usuario',
  templateUrl: './c-perfil-edit-usuario.component.html',
  styleUrls: ['./c-perfil-edit-usuario.component.css'],
})
export class CPerfilEditUsuarioComponent implements OnInit, OnDestroy {
  public rol: string | null = 'invitado';
  public usuario: IUsuario | any = {};
  public isLoading: boolean = true;
  public errorMessage: string = '';

  public registroForm = this.formBuilder.group({
    //password: ['', Validators.required],
    username: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    roles: ['', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.obtenerRol();
    this.obetenrRolDefaultForm();
    this.obtenerUsuario();
  }

  ngOnDestroy(): void {
    this.modalService.usuarioPerfilEditar.unsubscribe;
  }

  /* public get password() {
    return this.registroForm.controls.password;
  } */

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

  /** @description Obtiene rol por session */
  private obtenerRol() {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
  }

  /** @description Obtiene el rol por defecto del usuario para formulario */
  private obetenrRolDefaultForm() {
    switch (this.rol) {
      case 'admin':
        this.registroForm.controls.roles.setValue('is_superuser');
        break;

      case 'profesional':
        this.registroForm.controls.roles.setValue('is_staff');
        break;

      case 'paciente':
        this.registroForm.controls.roles.setValue('is_active');
        break;

      default:
        break;
    }
  }

  /** @description Obtiene usuario por Behavior Subject */
  private obtenerUsuario() {
    this.modalService.usuarioPerfilEditar.subscribe({
      next: (usuarioEditarData) => {
        this.isLoading = false;
        this.usuario = usuarioEditarData;
      },
      error: (errorData) => {
        console.error(errorData);
        this.errorMessage = 'No se pudieron cargar los datos del usuario.';
      },
    });
  }

  public editarUsuario() {
    if (this.registroForm.valid) {
      //this.usuario.password = this.password.value;
      this.usuario.username = this.username.value;
      this.usuario.first_name = this.first_name.value;
      this.usuario.last_name = this.last_name.value;
      this.usuario.email = this.email.value;
      this.setRolUsuario();
      this.usuario.is_active = true;

      this.usuarioService.editarUsuarioToken(this.usuario).subscribe({
        next: (usuarioData) => {
          Swal.fire({
            icon: 'success',
            title: `Editado`,
            text: `Se ha actualizado el usuario.`,
            timer: 3000,
          }).then(() => {
            this.setRolSesion();
            this.registroForm.reset();
            window.location.reload();
          });
        },
        error: (errorData) => {
          console.error(errorData);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo editar el el usuario.',
            timer: 3000,
          }).then(() => {
            window.location.reload();
          });
        },
        complete: () => {},
      });
    } else {
      this.registroForm.markAllAsTouched();
    }
  }

  /** @description Asigna rol usuario */
  private setRolUsuario() {
    switch (this.roles.value) {
      case 'is_superuser':
        this.usuario.is_superuser = true;
        this.usuario.is_staff = true;
        break;

      case 'is_staff':
        this.usuario.is_superuser = false;
        this.usuario.is_staff = true;
        break;

      default:
        this.usuario.is_superuser = false;
        this.usuario.is_staff = false;
        break;
    }
  }

  /** @description Registra rol en session */
  private setRolSesion() {
    switch (this.roles.value) {
      case 'is_superuser':
        sessionStorage.setItem('rol', 'admin');
        break;

      case 'is_staff':
        sessionStorage.setItem('rol', 'profesional');
        break;

      default:
        sessionStorage.setItem('rol', 'paciente');
        break;
    }
  }
}
