import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { ProfesionalInterface } from 'src/app/model/profesional';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';

@Component({
  selector: 'app-c-especialidad',
  templateUrl: './c-especialidad.component.html',
  styleUrls: ['./c-especialidad.component.css'],
})
export class CEspecialidadComponent {
  public especialidadLista: EspecialidadInterface[] = [];
  public profesionalLista: ProfesionalInterface[] = [];
  especialidadId!: number;

  constructor(
    private especialidadesService: EspecialidadesService,
    private profesionalesService: ProfesionalesService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.getEspecialidad();  
  };

  // Obtenemos el servicio de la especialidad
  public getEspecialidad() {
    this.especialidadesService.getEspecialidad().subscribe((respuesta) => {
      this.especialidadLista = respuesta;
      console.log(respuesta);
    });
  }

  // Obtenemos el id del servicio para mostrar los datos en el componente detalle-servicio
  public getEspecialidadId(id: number) {
    this.router.navigate(['/detalle-servicio', id]);
  }

  redirectToPay(){
    this.router.navigate(['pago']);
  };
}

