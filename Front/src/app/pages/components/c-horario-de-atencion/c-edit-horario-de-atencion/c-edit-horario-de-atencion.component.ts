import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HorarioAtencionInterface } from 'src/app/model/horarios-atencion';
import { HorariosAtencionService } from 'src/app/services/horarios-atencion.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-edit-horario-de-atencion',
  templateUrl: './c-edit-horario-de-atencion.component.html',
  styleUrls: ['./c-edit-horario-de-atencion.component.css'],
})
export class CEditHorarioDeAtencionComponent implements OnInit, OnDestroy {
  public horarioDeAtencion: HorarioAtencionInterface | any = {};

  public registroForm = this.formBuilder.group({
    dia_de_la_semana: ['', Validators.required],
    hora_entrada: ['', Validators.required],
    hora_salida: ['', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private horariosAtencionServices: HorariosAtencionService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.obtenerHorarioDeAtencion();
  }

  ngOnDestroy(): void {
    this.modalService.horarioDeAtencionEditar.unsubscribe;
  }

  public get dia_de_la_semana() {
    return this.registroForm.controls.dia_de_la_semana;
  }

  public get hora_entrada() {
    return this.registroForm.controls.hora_entrada;
  }

  public get hora_salida() {
    return this.registroForm.controls.hora_salida;
  }

  /** Obtiene el horario de atencion por Behavior Subject */
  public obtenerHorarioDeAtencion() {
    this.modalService.horarioDeAtencionEditar.subscribe({
      next: (horarioDeAtencionEditarData) => {
        this.horarioDeAtencion = horarioDeAtencionEditarData;
      },
    });
  }

  public editarHorarioDeAtencion() {
    if (this.registroForm.valid) {
      this.horarioDeAtencion.dia_de_la_semana = this.dia_de_la_semana.value;
      this.horarioDeAtencion.hora_entrada = this.hora_entrada.value;
      this.horarioDeAtencion.hora_salida = this.hora_salida.value;

      console.log('HORARIO DE ATENCION', this.horarioDeAtencion);

      this.horariosAtencionServices
        .editarHorarioDeAtencion(
          this.horarioDeAtencion.id,
          this.horarioDeAtencion
        )
        .subscribe({
          next: (horarioDeAtencionData) => {
            this.horarioDeAtencion = horarioDeAtencionData;
            Swal.fire({
              icon: 'success',
              title: `Editado`,
              text: `Se ha actualizado el horario de atencion.`,
              timer: 3000,
            }).then(() => {
              this.registroForm.reset();
              window.location.reload();
            });
          },
          error: (errorData) => {
            console.error(errorData);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo editar el horario de atencion.',
              timer: 3000,
            }).then(() => {
              window.location.reload();
            });
          },
          complete: () => {},
        });
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}
