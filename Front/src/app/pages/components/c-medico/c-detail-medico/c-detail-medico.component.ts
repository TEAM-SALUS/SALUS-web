import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMedico } from 'src/app/model/i-medico';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-c-detail-medico',
  templateUrl: './c-detail-medico.component.html',
  styleUrls: ['./c-detail-medico.component.css'],
})
export class CDetailMedicoComponent implements OnInit, OnDestroy {
  public medico!: IMedico;

  public constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.obtenerMedico();
  }

  ngOnDestroy(): void {
    this.modalService.medicoDetalle.unsubscribe;
  }

  /** @description Obtiene medico por Behavior Subject */
  private obtenerMedico() {
    this.modalService.medicoDetalle.subscribe({
      next: (medicoDetalleData) => {
        this.medico = medicoDetalleData;
      },
    });
  }
}
