import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EEstadoPago } from 'src/app/enums/e-estado-pago';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { IMedico } from 'src/app/model/i-medico';
import { IPago } from 'src/app/model/i-pago';
import { ITurno } from 'src/app/model/iturno';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { MedicoService } from 'src/app/services/medico.service';
import { PagoService } from 'src/app/services/pago.service';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-form-pago',
  templateUrl: './c-form-pago.component.html',
  styleUrls: ['./c-form-pago.component.css'],
})
export class CFormPagoComponent implements OnInit {
  public nuevoPago: IPago | any = {};
  public turnoLista: ITurno[] = [];
  public medicoLista: IMedico[] = [];
  public estadoPago = EEstadoPago;
  public especialidLista: EspecialidadInterface[] = [];

  public registroForm = this.formBuilder.group({
    monto: ['' /* Validators.required */],
    fecha: [
      formatDate(Date.now(), 'yyyy-MM-dd', 'es-AR') /*  Validators.required */,
    ],
    hora: [formatDate(Date.now(), 'hh:mm', 'es-AR') /*  Validators.required */],
    estado: ['' /* Validators.required */],
    is_active: [true],
    id_turno: ['' /* Validators.required */],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private pagoService: PagoService,
    private medicoService: MedicoService,
    private turnoService: TurnosService,
    private especialidadService: EspecialidadesService
  ) {}

  ngOnInit(): void {
    this.obtenerListaTurnos();
    this.obtenerListaEpecialidades();
    this.obtenerListaMedicos();
  }

  public get monto() {
    return this.registroForm.controls.monto;
  }
  public get fecha() {
    return this.registroForm.controls.fecha;
  }
  public get hora() {
    return this.registroForm.controls.hora;
  }
  public get estado() {
    return this.registroForm.controls.estado;
  }
  public get is_active() {
    return this.registroForm.controls.is_active;
  }
  public get id_turno() {
    return this.registroForm.controls.id_turno;
  }

  /** @description Obtiene lista de turnos */
  private obtenerListaTurnos() {
    this.turnoService.obtenerTurnos().subscribe({
      next: (turnoData) => {
        this.turnoLista = turnoData;
      },
    });
  }

  /** @description Obtiene lista de especialdiades */
  private obtenerListaEpecialidades() {
    this.especialidadService.getEspecialidad().subscribe({
      next: (especialidadData) => {
        this.especialidLista = especialidadData;
      },
    });
  }

  /** @description Obtiene lista de medicos */
  private obtenerListaMedicos() {
    this.medicoService.obtenerMedicos().subscribe({
      next: (medicoData) => {
        this.medicoLista = medicoData;
      },
    });
  }

  /** @description al seleccionar turno asigna precio y estado al formulario */
  public especialidadPorMedico() {
    let medicoAux: IMedico = {};

    for (const medico of this.medicoLista) {
      if (
        medico.id == (this.id_turno.value as ITurno).id_medico &&
        this.id_turno.value != ''
      ) {
        medicoAux = medico;
        break;
      }
    }

    for (const especialidad of this.especialidLista) {
      if (medicoAux.id_especialidad == especialidad.id) {
        if (this.id_turno.value != '') {
          this.monto.setValue(String(especialidad.precio));
          this.estado.setValue(
            (this.id_turno.value as ITurno).pagado
              ? EEstadoPago.ACEPTADO
              : EEstadoPago.RECHAZADO
          );
          return;
        }
      }
    }

    return;
  }

  /** @description Registra pago */
  public registrarPago() {
    if (this.registroForm.valid) {
      this.nuevoPago.monto = this.monto.value;
      this.nuevoPago.fecha = this.fecha.value;
      this.nuevoPago.hora = this.hora.value;
      this.nuevoPago.estado = this.estado.value;
      this.nuevoPago.is_active = this.is_active.value;
      this.nuevoPago.id_turno = (this.id_turno.value as ITurno).id ;

      this.pagoService.registrarPago(this.nuevoPago).subscribe({
        next: (pagoData) => {
          Swal.fire({
            icon: 'success',
            title: `Creado`,
            text: `Se ha agreagdo el pago.`,
            timer: 3000,
          }).then(() => {
            this.registroForm.reset();
            window.location.reload();
          });
        },
        error: (errorData) => {
          console.error(errorData);
          this.registroForm.reset();
          Swal.fire('Error', 'No se pudo crear el pago.', 'error');
        },
        complete: () => {},
      });
    } else {
      console.info('formulario invalido');
      this.registroForm.markAllAsTouched();
    }
  }
}
