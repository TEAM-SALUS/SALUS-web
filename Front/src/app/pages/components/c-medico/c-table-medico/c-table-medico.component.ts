import { Component, OnInit } from '@angular/core';
import { IMedico } from 'src/app/model/i-medico';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-table-medico',
  templateUrl: './c-table-medico.component.html',
  styleUrls: ['./c-table-medico.component.css'],
})
export class CTableMedicoComponent implements OnInit {
  rol: string | null = 'invitado';
  public medicosLista: IMedico[] = [];

  public constructor(
    private medicoService: MedicoService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.obtenerMedicos();
  }

  /** @description Obtenemos lista de medicos */
  private obtenerMedicos() {
    this.medicoService.obtenerMedicos().subscribe({
      next: (medicosData) => {
        this.medicosLista = medicosData;
      },
    });
  }

  /** @description Elimina medico por id */
  public eliminarMedico(id: number | undefined) {
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
        this.medicoService.borrarMedico(id).subscribe({
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
            Swal.fire('Error', 'No se pudo eliminar el medico.', 'error');
          },
          complete: () => {},
        });
      }
    });
  }

  /** @description Actualiza BehaviorSubject Medico ModalEditar */
  public irEditarMedico(medico: IMedico) {
    this.modalService.medicoEditar.next(medico);
  }

  /** @description Actualiza BehaviorSubject Medico ModelDetalle */
  public irDetalleMedico(medico: IMedico) {
    this.modalService.medicoDetalle.next(medico);
  }
}
