import { Component, OnInit } from '@angular/core';
import { IConsulta } from 'src/app/model/iconsulta';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-c-consulta',
  templateUrl: './c-consulta.component.html',
  styleUrls: ['./c-consulta.component.css'],
})
export class CConsultaComponent implements OnInit {
  rol: string | null = 'invitado';
  consultasList: IConsulta[] = [];

  constructor(private consultasService: ConsultasService) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.obtenerConsultas();
  }

  private obtenerConsultas() {
    this.consultasService.obtenerConsultas().subscribe({
      next: (consultasData) => {
        this.consultasList = consultasData;
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.log('Consultas recuperadas');
      },
    });
  }
}
