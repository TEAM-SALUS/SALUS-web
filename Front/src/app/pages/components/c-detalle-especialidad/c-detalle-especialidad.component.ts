import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';

@Component({
  selector: 'app-c-detalle-especialidad',
  templateUrl: './c-detalle-especialidad.component.html',
  styleUrls: ['./c-detalle-especialidad.component.css']
})
export class CDetalleEspecialidadComponent {
  especialidadId!: number;
  public especialidadLista: EspecialidadInterface[] = [];

  constructor(
    private router: ActivatedRoute,
    private especialidadService: EspecialidadesService,
  ){
  }

  ngOnInit(): void{
    this.especialidadId = this.router.snapshot.params['id'];
    this.verMasEspecialidad(this.especialidadId);
  };

  verMasEspecialidad(id:number){
    this.especialidadService.getEspecialidadId(id)
    .subscribe((respuesta) =>{
      this.especialidadLista.push(respuesta);
      console.log(respuesta);
    });
  };
};
