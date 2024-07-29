import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaSemana } from 'src/app/enums/dia-semana';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { HorarioAtencionInterface } from 'src/app/model/horarios-atencion';
import { ProfesionalInterface } from 'src/app/model/profesional';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HorariosAtencionService } from 'src/app/services/horarios-atencion.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-detalle-especialidad',
  templateUrl: './c-detalle-especialidad.component.html',
  styleUrls: ['./c-detalle-especialidad.component.css'],
})
export class CDetalleEspecialidadComponent implements OnInit {
  especialidadId!: number;
  public profesionalLista: ProfesionalInterface[] = [];
  public especialidad: EspecialidadInterface | any = {};
  public diaSemana: typeof DiaSemana = DiaSemana;
  public fechaHora: string = '';
  public mensajeFecha: string = '';
  public listaGuiaIndice: [ProfesionalInterface, HorarioAtencionInterface][] =
    [];

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    private especialidadService: EspecialidadesService,
    private profesionalService: ProfesionalesService,
    private horarioService: HorariosAtencionService
  ) {}

  ngOnInit(): void {
    this.especialidadId = this.activateRouter.snapshot.params['id'];
    this.obtenerEspecialidad();
  }

  public redirectToPay(
    diasSemana: string | undefined,
    idm: number | undefined,
    precio: number
  ) {
    //this.router.navigate(['pago']);
    const fechaHora = new Date(this.fechaHora);
    console.info(diasSemana!.split(';').indexOf(fechaHora.getDay().toString()));
    if (
      fechaHora >= new Date() &&
      diasSemana!.split(';').indexOf(fechaHora.getDay().toString()) != -1
    ) {
      /*console.log(fechaHora);
      console.log(formatDate(fechaHora, 'yyyy-MM-dd', 'es-AR'));
      console.log(formatDate(fechaHora, 'hh:mm', 'es-AR'));*/
      if (sessionStorage.getItem('id') != null) {
        Swal.fire('Éxito', 'Elija opcion de pago.', 'success').then(() => {
          //this.router.navigateByUrl(`pago/${idm}`);
          this.router.navigate([
            'pago',
            {
              fecha_hora: fechaHora,
              id_medico: idm,
              precio: precio,
              tipo_pago: 'turno',
            },
          ]);
        });
      } else {
        Swal.fire({
          title: 'Sweet!',
          text: 'Inicie sesion porfavor.',
          imageUrl: 'https://unsplash.it/400/200',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        });
        this.router.navigate(['login']);
      }
    } else if (
      diasSemana!.split(';').indexOf(fechaHora.getDay().toString()) != -1
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'La fecha es incorrecta.',
        icon: 'error',
        confirmButtonText: 'Cambiar fecha',
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: `El doctor no trabaja los ${this.diaSemana[fechaHora.getDay()]}`,
        icon: 'error',
        confirmButtonText: 'Cambiar fecha',
      });
    }
    this.fechaHora = '';
  }

  private obtenerEspecialidad() {
    this.especialidadService.getEspecialidadId(this.especialidadId).subscribe({
      next: (especialidadData) => {
        this.especialidad = especialidadData;
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        this.obtenerProfesionalesPorEspecialidad();
      },
    });
  }

  private obtenerProfesionalesPorEspecialidad() {
    this.profesionalService
      .getProfesionalesByEspecialidad(this.especialidadId)
      .subscribe({
        next: (profesionalesData) => {
          this.profesionalLista = profesionalesData;
        },
        error: (errorData) => {
          console.error(errorData);
        },
        complete: () => {
          this.obtenerHorarioPorProfesionales();
        },
      });
  }

  public obtenerHorarioPorProfesionales() {
    for (let profesional of this.profesionalLista) {
      this.horarioService
        .getHorarioAtencionId(profesional.id_horario)
        .subscribe({
          next: (horarioData) => {
            this.listaGuiaIndice.push([profesional, horarioData]);
          },
          error: (errorData) => {
            console.error(errorData);
          },
          complete: () => {},
        });
    }
  }
}
