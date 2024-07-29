import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/model/i-usuario';
import { LoginService } from 'src/app/services/auth/login.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-perfil-usuario',
  templateUrl: './c-perfil-usuario.component.html',
  styleUrls: ['./c-perfil-usuario.component.css'],
})
export class CPerfilUsuarioComponent implements OnInit {
  public rol: string | null = 'invitado';
  public usuarioPerfil: IUsuario = {};
  public isLoading: boolean = true;
  public errorMessage: string = '';

  public constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.obtenerUsuarioIngresadoToken();
  }

  /** @description Obtenemos usuario por token */
  private obtenerUsuarioIngresadoToken() {
    this.usuarioService.obtenerUsuarioToken().subscribe({
      next: (usuarioData) => {
        this.isLoading = false;
        this.usuarioPerfil = usuarioData;
      },
      error: (errorData) => {
        console.error(errorData);
        this.errorMessage = 'No se pudieron cargar los datos del usuario.';
      },
    });
  }

  /** @description Actualiza Behavior Usuario ModalPerfilEditar */
  public editarUsuarioToken() {
    this.modalService.usuarioPerfilEditar.next(this.usuarioPerfil);
  }

  /** @description Elimina usuario por token */
  public eliminarUsuarioToken() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D33',
      cancelButtonColor: '#3085D6',
      confirmButtonText: 'Si, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarUsuarioToken().subscribe({
          next: (usuarioData) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Se ha elimiando el usuario.',
              timer: 3000,
            }).then(() => {
              this.loginService.logout();
              window.location.reload();
            });
          },
          error: (errorData) => {
            console.log(errorData);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          },
          complete: () => {},
        });
      }
    });
  }

  /** @description Convierte password hash a string*/
  public convertirString(arg0: any) {
    return String(arg0).toString;
  }

  /** @description Formatea hora Date yyyy-MM-dd HH:MM */
  public convertirFechaHora(arg0: any) {
    return formatDate(new Date(arg0), 'yyyy-MM-dd HH:MM', 'es-AR');
  }
}
