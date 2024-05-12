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
  public profesional: ProfesionalInterface | undefined;

  constructor(
    private especialidadesService: EspecialidadesService,
    private profesionalesService: ProfesionalesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEspecialidad();
    this.getProfesional();
  }

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

  
  public getProfesional() {
    this.profesionalesService.getProfesionales().subscribe((respuesta) => {
      this.profesionalLista = respuesta;
      console.log(respuesta);
    });
  }


  public getProfesionalPorEspecialidad(idEspecialidad: number): ProfesionalInterface[] {
    return this.profesionalLista.filter(
      (profesional) => profesional.id_especialidad === idEspecialidad
    );
  };


  redirectToPay(){
    this.router.navigate(['pago']);
  };


  // getIdProfesional(idProfesional: number): void {
  //   this.profesionalesService.getProfesionalPorEspecialidadId(idProfesional).subscribe(
  //     (prof) => {
  //       this.profesional = prof;
  //     },
  //     error => {
  //       console.error('Error al obtener el profesional por su ID:', error);
  //     }
  //   );
  // }


  // public getProfesionalPorId(idProfesional: number): ProfesionalInterface | undefined {
  //   return this.profesionalLista.find(profesional => profesional.id_especialidad === idProfesional);
  // }


  // getIdProfesional(idProfesional: number): void {
  //   const profesional = this.profesionalesService.getProfesionalPorEspecialidadId(idProfesional);
  //   if (profesional) {
  //     this.profesionalLista.push(profesional);
  //   } else {
  //     console.error(`No se encontró ningún profesional con el ID ${idProfesional}`);
  //   }
  // }

}

