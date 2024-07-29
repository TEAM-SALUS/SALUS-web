import { Component, OnDestroy, OnInit } from '@angular/core';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-c-detail-especialidad',
  templateUrl: './c-detail-especialidad.component.html',
  styleUrls: ['./c-detail-especialidad.component.css'],
})
export class CDetailEspecialidadComponent implements OnInit, OnDestroy {
  public especialidad!: EspecialidadInterface;

  public constructor(private modalService: ModalService) {}
  ngOnInit(): void {
    this.obtenerEspecialidad();
  }

  ngOnDestroy(): void {
    this.modalService.especialidadDetalle.unsubscribe;
  }

  /** @description Obtiene especialidad por Behavior Subject */
  private obtenerEspecialidad() {
    this.modalService.especialidadDetalle.subscribe({
      next: (especialidadDetalleData) => {
        this.especialidad = especialidadDetalleData;
      },
    });
  }
}
