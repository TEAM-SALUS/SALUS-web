import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IPaciente } from 'src/app/model/i-paciente';
import { LoginService } from 'src/app/services/auth/login.service';
import { ModalService } from 'src/app/services/modal.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-perfil-paciente',
  templateUrl: './c-perfil-paciente.component.html',
  styleUrls: ['./c-perfil-paciente.component.css'],
})
export class CPerfilPacienteComponent implements OnInit {
  public pacientePerfil: IPaciente = {};
  public isLoading: boolean = true;
  public errorMessage: string = '';

  public constructor(
    private pacienteService: PacienteService,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.obtenerPacienteUsuario();
  }

  /** @description Obtenemos paciente por id usuario */
  private obtenerPacienteUsuario() {
    this.pacienteService
      .obtenerPacientePorIdUsuario(sessionStorage.getItem('id') as number | any)
      .subscribe({
        next: (pacienteData) => {
          this.isLoading = false;
          this.pacientePerfil = pacienteData;
        },
        error: (errorData) => {
          console.error(errorData);
          this.errorMessage = 'No se pudieron cargar los datos del paciente.';
        },
      });
  }

  /** @description Actualiza Behavior Paciente ModalPerfilEditar */
  public editarPaciente() {
    this.modalService.pacientePerfilEditar.next(this.pacientePerfil);
  }

  /** @description Elimina Paciente */
  public eliminarPaciente() {
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
        this.pacienteService.borrarPaciente(this.pacientePerfil.id) &&
          this.usuarioService
            .borrarUsuario(this.pacientePerfil.pacienteUser)
            .subscribe({
              next: (data) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Eliminado',
                  text: 'Se ha elimiando el paciente.',
                  timer: 3000,
                }).then(() => {
                  this.loginService.logout();
                  window.location.reload();
                });
              },
              error: (errorData) => {
                console.log(errorData);
                Swal.fire('Error', 'No se pudo eliminar el paciente.', 'error');
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
