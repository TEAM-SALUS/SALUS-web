import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITurno } from 'src/app/model/iturno';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-c-detail-turno',
  templateUrl: './c-detail-turno.component.html',
  styleUrls: ['./c-detail-turno.component.css'],
})
export class CDetailTurnoComponent implements OnInit, OnDestroy {
  public turno!: ITurno;

  public constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.obtenerTurno();
  }

  ngOnDestroy(): void {
    this.modalService.turnoDetalle.unsubscribe;
  }

  /** @description Obtiene turno por Behavior Subject */
  private obtenerTurno() {
    this.modalService.turnoDetalle.subscribe({
      next: (turnoDetalleData) => {
        this.turno = turnoDetalleData;
      },
    });
  }
}
