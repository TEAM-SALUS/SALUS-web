import { Component, OnDestroy, OnInit } from '@angular/core';
import { IObraSocial } from 'src/app/model/i-obra-social';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-c-detail-obra-social',
  templateUrl: './c-detail-obra-social.component.html',
  styleUrls: ['./c-detail-obra-social.component.css'],
})
export class CDetailObraSocialComponent implements OnInit, OnDestroy {
  public obraSocial!: IObraSocial;

  public constructor(private modalService: ModalService) {}

  public ngOnInit(): void {
    this.obtenerObraSocial();
  }

  public ngOnDestroy(): void {
    this.modalService.obraSocialDetalle.unsubscribe;
  }

  /** @description Obtiene obra social por Behavior Subject */
  private obtenerObraSocial() {
    this.modalService.obraSocialDetalle.subscribe({
      next: (obraSocialDetalleData) => {
        this.obraSocial = obraSocialDetalleData;
      },
    });
  }
}
