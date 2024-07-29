import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EEstadoPago } from 'src/app/enums/e-estado-pago';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { IMedico } from 'src/app/model/i-medico';
import { IPago } from 'src/app/model/i-pago';
import { ITurno } from 'src/app/model/iturno';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalService } from 'src/app/services/modal.service';
import { PagoService } from 'src/app/services/pago.service';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-edit-pago',
  templateUrl: './c-edit-pago.component.html',
  styleUrls: ['./c-edit-pago.component.css'],
})
export class CEditPagoComponent implements OnInit, OnDestroy {
  public pago: IPago | any = {};
  public turnoLista: ITurno[] = [];
  public medicoLista: IMedico[] = [];
  public estadoPago = EEstadoPago;
  public especialidLista: EspecialidadInterface[] = [];

  public registroForm = this.formBuilder.group({
    id: ['' /* Validators.required */],
    monto: ['' /* Validators.required */],
    fecha: ['' /*  Validators.required */],
    hora: ['' /*  Validators.required */],
    estado: ['' /* Validators.required */],
    is_active: [''],
    id_turno: ['' /* Validators.required */],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private pagoService: PagoService,
    private medicoService: MedicoService,
    private turnoService: TurnosService,
    private especialidadService: EspecialidadesService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.obtenerPago();
    this.obtenerListaTurnos();
    this.obtenerListaEpecialidades();
    this.obtenerListaMedicos();
  }
  ngOnDestroy(): void {
    this.modalService.pagoEditar.unsubscribe;
  }

  public get id() {
    return this.registroForm.controls.id;
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

  /** @description Obtiene pago por Behavior Subject */
  private obtenerPago() {
    this.modalService.pagoEditar.subscribe({
      next: (pagoData) => {
        // verifica no undefined
        if (pagoData.id) {
          this.pago = pagoData;
          this.obtenerPagoDefaultForm();
        }
      },
    });
  }

  /** @description Obtiene pago default en formulario */
  private obtenerPagoDefaultForm() {
    this.id.setValue(this.pago.id);
    this.monto.setValue(this.pago.monto);
    this.fecha.setValue(this.pago.fecha);
    this.hora.setValue(String(this.pago.hora));
    this.estado.setValue(this.pago.estado);
    this.is_active.setValue(this.pago.is_active);
    this.id_turno.setValue(this.turnoLista[0] as string | ITurno | any);
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

  /** Edita pago */
  public editarPago() {
    if (this.registroForm.valid) {
      this.pago.monto = this.monto.value;
      this.pago.fecha = this.fecha.value;
      this.pago.hora = this.hora.value;
      this.pago.estado = this.estado.value;
      this.pago.is_active = this.is_active.value;
      this.pago.id_turno = (this.id_turno.value as ITurno).id;

      this.pagoService.editarPago(this.pago.id, this.pago).subscribe({
        next: (pagoData) => {
          Swal.fire({
            icon: 'success',
            title: `Editado`,
            text: `Se ha actualizado el pago.`,
            //timer: 3000,
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
            text: 'No se pudo editar el pago.',
            //timer: 3000,
          }).then(() => {
            window.location.reload();
          });
        },
        complete: () => {},
      });
    } else {
      console.info('formulario invalido');
      this.registroForm.markAllAsTouched();
    }
  }
}
