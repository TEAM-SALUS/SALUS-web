import { Component } from '@angular/core';
import { DiaSemana } from 'src/app/enums/dia-semana';
import { HorarioAtencionInterface } from 'src/app/model/horarios-atencion';
import { HorariosAtencionService } from 'src/app/services/horarios-atencion.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-table-horario-de-atencion',
  templateUrl: './c-table-horario-de-atencion.component.html',
  styleUrls: ['./c-table-horario-de-atencion.component.css'],
})
export class CTableHorarioDeAtencionComponent {
  rol: string | null = 'invitado';
  public horariosDeAtencionesLista: HorarioAtencionInterface[] = [];
  public diaSemana: typeof DiaSemana = DiaSemana;

  public constructor(
    private horariosDeAtencionService: HorariosAtencionService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.obtenerHorariosDeAtenciones();
  }

  /** @description Obtenemos lista de horario de atencion */
  private obtenerHorariosDeAtenciones() {
    this.horariosDeAtencionService.getHorarioAtencion().subscribe({
      next: (horariosDeAtencionesData) => {
        this.horariosDeAtencionesLista = horariosDeAtencionesData;
      }
    });
  }

  /** @description Elimina horario de atencion por id */
  public eliminarHorarioDeAtencion(id: number | undefined) {
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
        this.horariosDeAtencionService.borrarHorarioDeAtencion(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Se ha eliminado la hora de atencion.',
              timer: 3000,
            }).then(() => {
              window.location.reload();
            });
          },
          error: (errorData) => {
            console.log(errorData);
            Swal.fire('Error', 'No se pudo eliminar la hora de atencion.');
          },
          complete: () => {},
        });
      }
    });
  }

  /** @description Actualiza BehaviorSubect HorarioDeAtencion ModalEditar */
  public irEditarHorarioDeAtencion(
    horarioDeAtencion: HorarioAtencionInterface
  ) {
    this.modalService.horarioDeAtencionEditar.next(horarioDeAtencion);
  }

  /** @description Actualiza BehaviorSubect HorarioDeAtencion ModalDetalle */
  public irDetalleHorarioDeAtencion(
    horarioDeAtencion: HorarioAtencionInterface
  ) {
    this.modalService.horarioDeAtencionDetalle.next(horarioDeAtencion);
  }
}
