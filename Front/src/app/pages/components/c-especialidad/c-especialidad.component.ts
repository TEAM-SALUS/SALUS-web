import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';

@Component({
  selector: 'app-c-especialidad',
  templateUrl: './c-especialidad.component.html',
  styleUrls: ['./c-especialidad.component.css']
})
export class CEspecialidadComponent {
  public especialidadLista: EspecialidadInterface[] = [];

  constructor(
    private especialidadesService:EspecialidadesService,
    private router: Router,
  ){
  };

  ngOnInit():void{
    this.getEspecialidad();
  };

  public getEspecialidad(){
    this.especialidadesService.getEspecialidad()
    .subscribe(respuesta =>{
      this.especialidadLista = respuesta;
      console.log(respuesta);
    });
  };

  public getEspecialidadId(id:number){
    this.router.navigate(['/detalle-servicio', id]);
  };
}

