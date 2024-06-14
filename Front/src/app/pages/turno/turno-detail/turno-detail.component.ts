import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ITurno } from 'src/app/model/iturno';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turno-detail',
  templateUrl: './turno-detail.component.html',
  styleUrls: ['./turno-detail.component.css'],
})
export class TurnoDetailComponent implements OnInit {
  idt: number = 0;
  turno: ITurno = {};

  constructor(private activatedRoute: ActivatedRoute,private turnoService:TurnosService) {}

  ngOnInit(): void {
    /** Obtiene id por parametro de ruta */
    this.obtenerIdRuta();
    /** Obtiene turno por idt */
    this.obtenerTurnoId(this.idt);
  }

  /** Obtiene id por parametro de ruta */
  private obtenerIdRuta() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idt = params['id'];
    });
  }

  /** Obtiene turno por idt */
  private obtenerTurnoId(id: number) {
    this.turnoService.obtenerTurnoId(id).subscribe({
      next: (turnoData) => {
        this.turno = turnoData;
      },
      error: (e) => {},
      complete: () => {}
    });
  };

}
