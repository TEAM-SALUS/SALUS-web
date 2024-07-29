import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EstadoTurno } from 'src/app/enums/estado-turno';
import { IMedico } from 'src/app/model/i-medico';
import { IPaciente } from 'src/app/model/i-paciente';
import { ITurno } from 'src/app/model/iturno';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalService } from 'src/app/services/modal.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-edit-turno',
  templateUrl: './c-edit-turno.component.html',
  styleUrls: ['./c-edit-turno.component.css'],
})
export class CEditTurnoComponent implements OnInit, OnDestroy {
  public turno: ITurno | any = {};
  public medicoLista: IMedico[] = [];
  public pacienteLista: IPaciente[] = [];
  public estadoTurno = EstadoTurno;
  public rol: string | null = this.obtenerRolSession();

  public registroForm = this.formBuilder.group({
    id: ['' /* Validators.required */],
    fecha: ['' /*  Validators.required */],
    horario: ['' /*  Validators.required */],
    pagado: [
      {
        value: '',
        disabled: this.rol != 'adnin',
      } /* Validators.required */,
    ],
    estado: [
      {
        value: '',
        disabled: this.rol == 'paciente',
      } /* Validators.required */,
    ],
    sintomas: ['' /* Validators.required */],
    diagnostico: ['' /* Validators.required */],
    tratamiento: ['' /*  Validators.required */],
    is_active: [''],
    id_medico: [
      {
        value: '',
        disabled: this.rol != 'adnin',
      } /* Validators.required */,
    ],
    id_paciente: [
      {
        value: '',
        disabled: this.rol != 'adnin',
      } /* Validators.required */,
    ],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private turnoService: TurnosService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.obtenerTurno();
    this.obtenerListaMedicos();
    this.obtenerListaPacientes();
  }

  ngOnDestroy(): void {
    this.modalService.turnoEditar.unsubscribe;
  }

  public get id() {
    return this.registroForm.controls.id;
  }
  public get fecha() {
    return this.registroForm.controls.fecha;
  }
  public get horario() {
    return this.registroForm.controls.horario;
  }
  public get pagado() {
    return this.registroForm.controls.pagado;
  }
  public get estado() {
    return this.registroForm.controls.estado;
  }
  public get sintomas() {
    return this.registroForm.controls.sintomas;
  }
  public get diagnostico() {
    return this.registroForm.controls.diagnostico;
  }
  public get tratamiento() {
    return this.registroForm.controls.tratamiento;
  }
  public get is_active() {
    return this.registroForm.controls.is_active;
  }
  public get id_medico() {
    return this.registroForm.controls.id_medico;
  }
  public get id_paciente() {
    return this.registroForm.controls.id_paciente;
  }

  /** @description Obtiene turno por Behavior Subject */
  private obtenerTurno() {
    this.modalService.turnoEditar.subscribe({
      next: (turnoData) => {
        this.turno = turnoData;
        this.obtenerTurnoDefaultForm();
      },
    });
  }

  /** @description Obtiene turno default en formulario */
  private obtenerTurnoDefaultForm() {
    this.id.setValue(this.turno.id);
    this.fecha.setValue(this.turno.fecha);
    this.horario.setValue(this.turno.horario);
    this.pagado.setValue(String(this.turno.pagado));
    this.estado.setValue(this.turno.estado);
    this.sintomas.setValue(this.turno.sintomas);
    this.diagnostico.setValue(this.turno.diagnostico);
    this.tratamiento.setValue(this.turno.tratamiento);
    this.is_active.setValue(this.turno.is_active);
    this.id_medico.setValue(this.turno.id_medico);
    this.id_paciente.setValue(this.turno.id_paciente);
  }

  /** @description Obtiene lista de medicos */
  private obtenerListaMedicos() {
    this.medicoService.obtenerMedicos().subscribe({
      next: (medicoData) => {
        this.medicoLista = medicoData;
      },
    });
  }

  /** @description Obtiene lista de pacientes */
  private obtenerListaPacientes() {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (pacienteData) => {
        this.pacienteLista = pacienteData;
      },
    });
  }

  /** @description obtiene rol session */
  private obtenerRolSession(): string | null {
    return sessionStorage.getItem('rol') != null
      ? sessionStorage.getItem('rol')
      : 'invitado';
  }

  /** @description Edita turno */
  public editarTurno() {
    if (this.registroForm.valid) {
      this.turno.fecha = this.fecha.value;
      this.turno.horario = this.horario.value;
      this.turno.pagado = this.pagado.value == 'true' ? true : false;
      this.turno.estado = this.estado.value;
      this.turno.sintomas = this.sintomas.value;
      this.turno.diagnostico = this.diagnostico.value;
      this.turno.tratamiento = this.tratamiento.value;
      this.turno.is_active = true;
      this.turno.id_medico = this.id_medico.value;
      this.turno.id_paciente = this.id_paciente.value;

      this.turnoService.editarTurno(this.turno.id, this.turno).subscribe({
        next: (turnoData) => {
          Swal.fire({
            icon: 'success',
            title: `Editado`,
            text: `Se ha actualizado el turno.`,
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
            text: 'No se pudo editar el turno.',
            timer: 3000,
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
