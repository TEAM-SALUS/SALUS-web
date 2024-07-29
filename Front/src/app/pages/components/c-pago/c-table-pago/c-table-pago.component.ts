import { Component, OnInit } from '@angular/core';
import { IPago } from 'src/app/model/i-pago';
import { ModalService } from 'src/app/services/modal.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { PagoService } from 'src/app/services/pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-table-pago',
  templateUrl: './c-table-pago.component.html',
  styleUrls: ['./c-table-pago.component.css'],
})
export class CTablePagoComponent implements OnInit {
  rol: string | null = 'invitado';
  public pagosLista: IPago[] = [];

  public constructor(
    private pagoService: PagoService,
    private modalService: ModalService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.obtenerPagos();
  }

  /** @description Obtenemos lista de pagos */
  private obtenerPagos() {
    switch (this.rol) {
      case 'admin':
        this.obtenerPagosAdmin();
        break;
      case 'profesional':
        //this.obtenerIdMedicoPagos();
        break;

      case 'paciente':
        this.obtenerIdPacientePagos();
        break;

      default:
        break;
    }
  }

  // admin
  /** @description Obtenemos lista de pagos administrador */
  private obtenerPagosAdmin() {
    this.pagoService.obtenerPagos().subscribe({
      next: (pagosData) => {
        this.pagosLista = pagosData;
      },
    });
  }

  // paciente
  /** @description Obtenemos id paciente */
  private obtenerIdPacientePagos() {
    this.pacienteService
      .obtenerPacientePorIdUsuario(Number(sessionStorage.getItem('id')))
      .subscribe({
        next: (pacienteData) => {
          this.obtenerPagosPciente(Number(pacienteData.id));
        },
      });
  }

  /** @description Obtenemos lista de turnos paciente*/
  private obtenerPagosPciente(id: number) {
    this.pagoService.obtenerPagosPaciente(id).subscribe({
      next: (pagosData) => {
        this.pagosLista = pagosData;
      },
    });
  }

  /** @description Elimina pago por id */
  public eliminarPago(id: number | undefined) {
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
        this.pagoService.borrarPago(id).subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Se ha elimiando el pago.',
              timer: 3000,
            }).then(() => {
              window.location.reload();
            });
          },
          error: (errorData) => {
            console.log(errorData);
            Swal.fire('Error', 'No se pudo eliminar el pago.', 'error');
          },
          complete: () => {},
        });
      }
    });
  }

  /** @description Actualiza BehaviorSubject Pago ModalEditar */
  public irEditarPago(pago: IPago) {
    this.modalService.pagoEditar.next(pago);
  }

  /** @description Actualiza BehaviorSubject Pago ModalDetalle */
  public irDetallePago(pago: IPago) {
    this.modalService.pagoDetalle.next(pago);
  }
}
