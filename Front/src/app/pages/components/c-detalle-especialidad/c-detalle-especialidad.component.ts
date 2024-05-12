import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router} from '@angular/router';
import { filter } from 'rxjs';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { ProfesionalInterface } from 'src/app/model/profesional';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';

@Component({
  selector: 'app-c-detalle-especialidad',
  templateUrl: './c-detalle-especialidad.component.html',
  styleUrls: ['./c-detalle-especialidad.component.css']
})
export class CDetalleEspecialidadComponent {
  especialidadId!: number;
  profesionalXEspecialidad: any[] = [];
  public especialidadLista: EspecialidadInterface[] = [];
  public profesionalLista: ProfesionalInterface[] = [];

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private especialidadService: EspecialidadesService,
    private profesionalService: ProfesionalesService,
  ){
  }

  ngOnInit(): void{
    this.especialidadId = this.router.snapshot.params['id'];
    this.verMasEspecialidad(this.especialidadId);


    // Filtrar el profesional por el campo id_especialidad del id de la tabla especialidad
    this.especialidadService.getEspecialidadId(this.especialidadId).subscribe((especialidad) => {
      this.especialidadLista = [especialidad];
      this.profesionalService.getProfesionalesByEspecialidad(especialidad.id).subscribe((profesionales) => {
        this.profesionalLista = profesionales.filter(profesional => profesional.id_especialidad == especialidad.id);
        this.profesionalXEspecialidad = this.profesionalLista;
      });
    });

  };

  
  verMasEspecialidad(id:number){
    this.especialidadService.getEspecialidadId(id)
    .subscribe((respuesta) =>{
      this.especialidadLista.push(respuesta);
      console.log(respuesta);
    });
  };

  redirectToPay(){
    this.route.navigate(['pago']);
  };


  getProfesionalesXEspecialidad(){
    let p = this.profesionalLista.filter(p => 
      this.especialidadLista.some(e => e.id == p.id_especialidad));
      console.log('PROFESIONALES: ', p)  
    }


  // getProfesionalPorEspecialidad(idEspecialidad: number){
  //   return this.profesionalLista.filter(
  //     (profesional) => profesional.id_especialidad === idEspecialidad
  //   );
  // };
};
