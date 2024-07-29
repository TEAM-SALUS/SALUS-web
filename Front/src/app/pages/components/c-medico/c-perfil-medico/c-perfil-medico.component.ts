import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { IMedico } from 'src/app/model/i-medico';
import { LoginService } from 'src/app/services/auth/login.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-perfil-medico',
  templateUrl: './c-perfil-medico.component.html',
  styleUrls: ['./c-perfil-medico.component.css'],
})
export class CPerfilMedicoComponent {
  public medicoPerfil: IMedico = {};
  public isLoading: boolean = true;
  public errorMessage: string = '';

  public constructor(
    private medicoService: MedicoService,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.obtenerMedicoUsuario();
  }

  /** @description Obtenemos medico por id usuario */
  private obtenerMedicoUsuario() {
    this.medicoService
      .obtenerMedicoPorIdUsuario(sessionStorage.getItem('id') as number | any)
      .subscribe({
        next: (medicoData) => {
          this.isLoading = false;
          this.medicoPerfil = medicoData;
        },
        error: (errorData) => {
          console.error(errorData);
          this.errorMessage = 'No se pudieron cargar los datos del medico.';
        },
      });
  }

  /** @description Actualiza Behavior Medico ModalPerfilEditar */
  public editarMedico() {
    this.modalService.medicoPerfilEditar.next(this.medicoPerfil);
  }

  /** @description Elimina medico */
  public eliminarMedico() {
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
        this.medicoService.borrarMedico(this.medicoPerfil.id) &&
          this.usuarioService
            .borrarUsuario(this.medicoPerfil.medicoUser)
            .subscribe({
              next: (data) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Eliminado',
                  text: 'Se ha elimiando el medico.',
                  timer: 3000,
                }).then(() => {
                  this.loginService.logout();
                  window.location.reload();
                });
              },
              error: (errorData) => {
                console.log(errorData);
                Swal.fire('Error', 'No se pudo eliminar el medico.', 'error');
              },
              complete: () => {
              },
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
