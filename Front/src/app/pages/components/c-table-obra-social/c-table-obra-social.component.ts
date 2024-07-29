import { Component, OnInit } from '@angular/core';
import { IObraSocial } from 'src/app/model/i-obra-social';
import { ModalService } from 'src/app/services/modal.service';
import { ObraSocialService } from 'src/app/services/obra-social.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-table-obra-social',
  templateUrl: './c-table-obra-social.component.html',
  styleUrls: ['./c-table-obra-social.component.css'],
})
export class CTableObraSocialComponent implements OnInit {
  rol: string | null = 'invitado';
  public obrasSocialesLista: IObraSocial[] = [];

  public constructor(
    private obraSocialService: ObraSocialService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.obtenerObrasSociales();
  }

  /** @description Obtenemos lista de obras sociales */
  private obtenerObrasSociales() {
    this.obraSocialService.obtenerObrasSociales().subscribe({
      next: (obrasSocialesData) => {
        this.obrasSocialesLista = obrasSocialesData;
      }
    });
  }

  /** @description Elimina obra social por id */
  public eliminarObraSocial(id: number | undefined) {
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
        this.obraSocialService.borrarObraSocial(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Se ha elimiando la obra social.',
              timer: 3000,
            }).then(() => {
              window.location.reload();
            });
          },
          error: (errorData) => {
            console.log(errorData);
            Swal.fire('Error', 'No se pudo eliminar la obra social.', 'error');
          },
          complete: () => {},
        });
      }
    });
  }

  /** @description Actualiza BehaviorSubect ObraSocial ModalEditar */
  public irEditarObraSocial(obraSocial: IObraSocial) {
    this.modalService.obraSocialEditar.next(obraSocial);
  }

  /** @description Actualiza BehaviorSubect ObraSocial ModalDetalle */
  public irDetalleObraSocial(obraSocial: IObraSocial) {
    this.modalService.obraSocialDetalle.next(obraSocial);
  }
}
