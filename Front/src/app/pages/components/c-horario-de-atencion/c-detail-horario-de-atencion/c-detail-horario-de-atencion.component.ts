import { Component } from '@angular/core';
import { DiaSemana } from 'src/app/enums/dia-semana';
import { HorarioAtencionInterface } from 'src/app/model/horarios-atencion';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-c-detail-horario-de-atencion',
  templateUrl: './c-detail-horario-de-atencion.component.html',
  styleUrls: ['./c-detail-horario-de-atencion.component.css'],
})
export class CDetailHorarioDeAtencionComponent {
  public horarioDeAtencion!: HorarioAtencionInterface;
  public diaSemana: typeof DiaSemana = DiaSemana;

  public constructor(private modalService: ModalService) {}

  public ngOnInit(): void {
    this.obtenerHorarioDeAtencio();
  }

  public ngOnDestroy(): void {
    this.modalService.obraSocialDetalle.unsubscribe;
  }

  /** @description Obtiene horario de atencion por Behavior Subject */
  private obtenerHorarioDeAtencio() {
    this.modalService.horarioDeAtencionDetalle.subscribe({
      next: (ohorarioDeAtencionDetalleData) => {
        this.horarioDeAtencion = ohorarioDeAtencionDetalleData;
      },
    });
  }
}
