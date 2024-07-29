import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPago } from 'src/app/model/i-pago';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-c-detail-pago',
  templateUrl: './c-detail-pago.component.html',
  styleUrls: ['./c-detail-pago.component.css'],
})
export class CDetailPagoComponent implements OnInit, OnDestroy {
  public pago!: IPago;

  public constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.obtenerPago();
  }
  ngOnDestroy(): void {
    this.modalService.pagoDetalle.unsubscribe;
  }

  /** @description Obtiene pago por Behavior Subject */
  private obtenerPago() {
    this.modalService.pagoDetalle.subscribe({
      next: (pagoDetalleData) => {
        this.pago = pagoDetalleData;
      },
    });
  }
}
