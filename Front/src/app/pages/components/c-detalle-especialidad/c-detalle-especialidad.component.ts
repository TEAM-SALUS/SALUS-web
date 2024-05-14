import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { HorarioAtencionInterface } from 'src/app/model/horarios-atencion';
import { ProfesionalInterface } from 'src/app/model/profesional';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HorariosAtencionService } from 'src/app/services/horarios-atencion.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';

@Component({
  selector: 'app-c-detalle-especialidad',
  templateUrl: './c-detalle-especialidad.component.html',
  styleUrls: ['./c-detalle-especialidad.component.css']
})
export class CDetalleEspecialidadComponent {
  especialidadId!: number;
  profesionalXHorario: any[] = [];
  profesionalXEspecialidad: any[] = [];
  public especialidadLista: EspecialidadInterface[] = [];
  public profesionalLista: ProfesionalInterface[] = [];
  public horarioAtencionLista: HorarioAtencionInterface[] = [];


  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private especialidadService: EspecialidadesService,
    private profesionalService: ProfesionalesService,
    private horarioService: HorariosAtencionService,
  ){
  };

  ngOnInit(): void{
    this.especialidadId = this.router.snapshot.params['id'];

    // Filtrar el profesional por el campo id_especialidad del id de la tabla especialidad
    this.especialidadService.getEspecialidadId(this.especialidadId)
    .subscribe((especialidad) => {
      this.especialidadLista = [especialidad];
      this.profesionalService.getProfesionalesByEspecialidad(especialidad.id)
      .subscribe((profesionales) => {
        this.profesionalLista = profesionales.filter(profesional => profesional.id_especialidad == especialidad.id);
        this.profesionalXEspecialidad = this.profesionalLista;
      });
    });

        // Obtener la especialidad
        this.especialidadService.getEspecialidadId(this.especialidadId).subscribe((especialidad) => {
          // Filtrar los profesionales por la especialidad
          this.profesionalService.getProfesionalesByEspecialidad(especialidad.id).subscribe((profesionales) => {
            this.profesionalXEspecialidad = profesionales.filter(profesional => profesional.id_especialidad == especialidad.id);
            // Iterar sobre los profesionales para obtener sus horarios de atención
            this.profesionalXEspecialidad.forEach(profesional => {
              if (profesional.id_horario !== undefined) {
                // Obtener los horarios de atención para cada profesional
                this.horarioService.getProfesionalXHorario(profesional.id_horario).subscribe((horarios) => {
                  // Filtrar el horario de atención del profesional actual
                  const horarioProfesional = horarios.find(horario => horario.id == profesional.id_horario);
                  if (horarioProfesional) {
                    this.profesionalXHorario.push(horarioProfesional);
                  };
                });
              }
            });
          });
        });
    
        // Obtener todos los horarios de atención
        this.horarioService.getHorarioAtencion().subscribe((horario) => {
          this.horarioAtencionLista = horario;
        });
    };

  redirectToPay(){
    this.route.navigate(['pago']);
  };
};
