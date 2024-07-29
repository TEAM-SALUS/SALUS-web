import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-table-especialidad',
  templateUrl: './c-table-especialidad.component.html',
  styleUrls: ['./c-table-especialidad.component.css'],
})
export class CTableEspecialidadComponent implements OnInit {
  rol: string | null = 'invitado';
  public especialidadesList: EspecialidadInterface[] = [];

  public constructor(
    private especialidadesService: EspecialidadesService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.obtenerEspecialidaes();
  }

  /** @description Obtenemos lista de especialidades */
  private obtenerEspecialidaes() {
    this.especialidadesService.getEspecialidad().subscribe({
      next: (especialidadesData) => {
        this.especialidadesList = especialidadesData;
      },
    });
  }

  /** @description Elimina especialidad por id */
  public eliminarEspecialidad(id: number | undefined) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.especialidadesService.borrarEspecialidad(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El servicio ha sido eliminado.',
              timer: 3000,
            }).then(() => {
              window.location.reload();
            });
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Error', 'No se pudo eliminar el servicio.', 'error');
          },
          complete: () => {},
        });
      }
    });
  }

  /** @description Redirigimos a editar especialidad por id */
  public redirectToEdit(id: number | undefined) {
    this.router.navigate(['editar-servicio', id]);
  }

  /** @description Actualiza BehaviorSubect Especialidad ModalDetalle */
  public irDetalleEspecialidad(especialidad: EspecialidadInterface) {
    this.modalService.especialidadDetalle.next(especialidad);
  }
}
