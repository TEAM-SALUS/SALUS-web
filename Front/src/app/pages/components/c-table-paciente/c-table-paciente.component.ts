import { Component, OnInit } from '@angular/core';
import { IPaciente } from 'src/app/model/i-paciente';
import { ModalService } from 'src/app/services/modal.service';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-table-paciente',
  templateUrl: './c-table-paciente.component.html',
  styleUrls: ['./c-table-paciente.component.css'],
})
export class CTablePacienteComponent implements OnInit {
  rol: string | null = 'invitado';
  public pacientesLista: IPaciente[] = [];

  public constructor(
    private pacienteService: PacienteService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.obtenerPacientes();
  }

  /** @description Obtenemos lista de pacientes */
  private obtenerPacientes() {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (pacientesData) => {
        this.pacientesLista = pacientesData;
      },
    });
  }

  /** @description Elimina paciente por id */
  public eliminarPaciente(id: number | undefined) {
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
        this.pacienteService.borrarPaciente(id).subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Se ha elimiando el paciente.',
              timer: 3000,
            }).then(() => {
              window.location.reload();
            });
          },
          error: (errorData) => {
            console.log(errorData);
            Swal.fire('Error', 'No se pudo eliminar el paciente.', 'error');
          },
          complete: () => {},
        });
      }
    });
  }

  /** @description Actualiza BehaviorSubect Paciente ModalEditar */
  public irEditarPaciente(paciente: IPaciente) {
    this.modalService.pacienteEditar.next(paciente);
  }

  /** @description Actualiza BehaviorSubect Paciente ModalDetalle */
  public irDetallePaciente(paciente: IPaciente) {
    this.modalService.pacienteDetalle.next(paciente);
  }
}
