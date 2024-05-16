import { Component } from '@angular/core';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { EspecialidadInterface } from 'src/app/model/especialidad';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent {
  public especialidadLista: EspecialidadInterface[] = [];
  // id?:number;
  // nombre?:string;
  // precio?:number;
  // imagen?:string;

  constructor(private especialidadesService:EspecialidadesService){}

  ngOnInit():void{
    this.getEspecialidad();
  }

  public getEspecialidad(){
    this.especialidadesService.getEspecialidad()
    .subscribe(respuesta =>{
      this.especialidadLista = respuesta;
      console.log(respuesta)
    })
  }
}
