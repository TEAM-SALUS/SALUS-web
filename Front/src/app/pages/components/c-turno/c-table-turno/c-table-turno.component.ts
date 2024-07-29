import { Component, OnInit } from '@angular/core';
import { IMedico } from 'src/app/model/i-medico';
import { ITurno } from 'src/app/model/iturno';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalService } from 'src/app/services/modal.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-table-turno',
  templateUrl: './c-table-turno.component.html',
  styleUrls: ['./c-table-turno.component.css'],
})
export class CTableTurnoComponent implements OnInit {
  rol: string | null = 'invitado';
  public turnosLista: ITurno[] = [];

  public constructor(
    private turnoService: TurnosService,
    private modalService: ModalService,
    private medicoService: MedicoService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.obtenerTurnos();
  }

  /** @description Obtenemos lista de turnos */
  private obtenerTurnos() {
    switch (this.rol) {
      case 'admin':
        this.obtenerTurnosAdmin();
        break;
      case 'profesional':
        this.obtenerIdMedicoTurnos();
        break;

      case 'paciente':
        this.obtenerIdPacienteTurnos();
        break;

      default:
        break;
    }
  }

  // admin
  /** @description Obtenemos lista de turnos administrador*/
  private obtenerTurnosAdmin() {
    this.turnoService.obtenerTurnos().subscribe({
      next: (turnosData) => {
        this.turnosLista = turnosData;
      },
    });
  }

  // medico
  /** Obtenemos id medico */
  private obtenerIdMedicoTurnos() {
    this.medicoService
      .obtenerMedicoPorIdUsuario(Number(sessionStorage.getItem('id')))
      .subscribe({
        next: (medicoData) => {
          console.info('MEDICO DATA', medicoData);
          this.obtenerTurnosMedico(Number(medicoData.id));
        },
      });
  }

  /** @description Obtenemos lista de turnos medico*/
  private obtenerTurnosMedico(id: number) {
    this.turnoService.obtenerTurnosMedico(id).subscribe({
      next: (turnosData) => {
        this.turnosLista = turnosData;
      },
    });
  }

  // paciente
  /** @description Obtenemos id paciente */
  private obtenerIdPacienteTurnos() {
    this.pacienteService
      .obtenerPacientePorIdUsuario(Number(sessionStorage.getItem('id')))
      .subscribe({
        next: (pacienteData) => {
          this.obtenerTurnosPciente(Number(pacienteData.id));
        },
      });
  }

  /** @description Obtenemos lista de turnos paciente*/
  private obtenerTurnosPciente(id: number) {
    this.turnoService.obtenerTurnosPaciente(id).subscribe({
      next: (turnosData) => {
        this.turnosLista = turnosData;
      },
    });
  }

  /** @description Elimina turno por id */
  public eliminarTurno(id: number | undefined) {
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
        this.turnoService.borrarTurno(id).subscribe({
          next: (data) => {
            console.info('turno borrado', data);
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Se ha elimiando el turno.',
              timer: 3000,
            }).then(() => {
              window.location.reload();
            });
          },
          error: (errorData) => {
            console.log(errorData);
            Swal.fire('Error', 'No se pudo eliminar el turno.', 'error');
          },
          complete: () => {},
        });
      }
    });
  }

  /** @description Actualiza BehaviorSubject Turno ModalEditar */
  public irEditarTurno(turno: ITurno) {
    this.modalService.turnoEditar.next(turno);
  }

  /** @description Actualiza BehaviorSubject Turno ModalDetalle */
  public irDetalleTurno(turno: ITurno) {
    this.modalService.turnoDetalle.next(turno);
  }
}
