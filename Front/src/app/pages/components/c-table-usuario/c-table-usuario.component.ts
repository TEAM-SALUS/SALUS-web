import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/model/i-usuario';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-table-usuario',
  templateUrl: './c-table-usuario.component.html',
  styleUrls: ['./c-table-usuario.component.css'],
})
export class CTableUsuarioComponent implements OnInit {
  rol: string | null = 'invitado';
  public usuariosLista: IUsuario[] = [];

  public constructor(
    private usuarioService: UsuarioService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.obtenerUsuarios();
  }

  /** @description Obtenemos lista de usuarios */
  private obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuariosData) => {
        this.usuariosLista = usuariosData;
      }
    });
  }

  /** @description Elimina usuario por id */
  public eliminarUsuario(id: number | undefined) {
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
        this.usuarioService.borrarUsuario(id).subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Se ha elimiando el usuario.',
              timer: 3000,
            }).then(() => {
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

  /** @description Actualiza BehaviorSubect Usuario ModalEditar */
  public irEditarUsuario(usuario: IUsuario) {
    this.modalService.usuarioEditar.next(usuario);
  }

  /** @description Actualiza BehaviorSubect Usuario ModalDetalle */
  public irDetalleUsuario(usuario: IUsuario) {
    this.modalService.usuarioDetalle.next(usuario);
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
