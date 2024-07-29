import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPaciente } from 'src/app/model/i-paciente';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-c-detail-paciente',
  templateUrl: './c-detail-paciente.component.html',
  styleUrls: ['./c-detail-paciente.component.css'],
})
export class CDetailPacienteComponent implements OnInit, OnDestroy {
  public paciente!: IPaciente;

  public constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.obtenerPaciente();
  }

  ngOnDestroy(): void {
    this.modalService.pacienteDetalle.unsubscribe;
  }

  /** @description Obtiene paciente por Behavior Subject */
  private obtenerPaciente() {
    this.modalService.pacienteDetalle.subscribe({
      next: (pacienteDetalleData) => {
        this.paciente = pacienteDetalleData;
      },
    });
  }
}
