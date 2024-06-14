import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITurno } from 'src/app/model/iturno';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-c-turno',
  templateUrl: './c-turno.component.html',
  styleUrls: ['./c-turno.component.css'],
})
export class CTurnoComponent implements OnInit {
  rol: string | null = 'invitado';
  turnosList: ITurno[] = [];

  constructor(private turnosService: TurnosService,private router:Router) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.obtenerTurnos();
  }

  private obtenerTurnos() {
    this.turnosService.obtenerTurnos().subscribe({
      next: (turnosData) => {
        this.turnosList = turnosData;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        console.log('Turnos recuperados');
      },
    });
  }
  /** Ir a detalle de turno */
  irTurno(id: number|undefined) {
    this.router.navigate(["detalle-turno",id]);
  }
}
