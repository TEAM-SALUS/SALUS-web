import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HorarioAtencionInterface } from 'src/app/model/horarios-atencion';
import { HorariosAtencionService } from 'src/app/services/horarios-atencion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-form-horario-de-atencion',
  templateUrl: './c-form-horario-de-atencion.component.html',
  styleUrls: ['./c-form-horario-de-atencion.component.css'],
})
export class CFormHorarioDeAtencionComponent implements OnInit {
  public nuevoHorarioDeAtencion: HorarioAtencionInterface | any = {};

  public registroForm = this.formBuilder.group({
    dia_de_la_semana: ['', Validators.required],
    hora_entrada: ['', Validators.required],
    hora_salida: ['', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private horariosAtencionServices: HorariosAtencionService
  ) {}

  ngOnInit(): void {}

  public get dia_de_la_semana() {
    return this.registroForm.controls.dia_de_la_semana;
  }

  public get hora_entrada() {
    return this.registroForm.controls.hora_entrada;
  }

  public get hora_salida() {
    return this.registroForm.controls.hora_salida;
  }

  public registrarHorarioDeAtencion() {
    if (this.registroForm.valid) {
      this.nuevoHorarioDeAtencion.dia_de_la_semana = this.dia_de_la_semana.value;
      this.nuevoHorarioDeAtencion.hora_entrada = this.hora_entrada.value;
      this.nuevoHorarioDeAtencion.hora_salida = this.hora_salida.value;

      this.horariosAtencionServices
        .registrarHorarioDeAtencion(this.nuevoHorarioDeAtencion)
        .subscribe({
          next: (horarioDeAtencionData) => {
            console.info(horarioDeAtencionData);
            Swal.fire({
              icon: 'success',
              title: `Creado`,
              text: `Se ha agreagdo la hora de atencion.`,
              timer: 3000,
            }).then(() => {
              this.registroForm.reset();
              window.location.reload();
            });
          },
          error: (errorData) => {
            console.error(errorData);
            this.registroForm.reset();
            Swal.fire('Error', 'No se pudo crear la hora de atencion.', 'error');
          },
          complete: () => {},
        });
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}
