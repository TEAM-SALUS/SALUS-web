import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EstadoTurno } from 'src/app/enums/estado-turno';
import { IMedico } from 'src/app/model/i-medico';
import { IPaciente } from 'src/app/model/i-paciente';
import { ITurno } from 'src/app/model/iturno';
import { MedicoService } from 'src/app/services/medico.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-form-turno',
  templateUrl: './c-form-turno.component.html',
  styleUrls: ['./c-form-turno.component.css'],
})
export class CFormTurnoComponent implements OnInit {
  public nuevoTurno: ITurno | any = {};
  public medicoLista: IMedico[] = [];
  public pacienteLista: IPaciente[] = [];
  public estadoTurno = EstadoTurno;

  public registroForm = this.formBuilder.group({
    fecha: [formatDate(Date.now(), 'yyyy-MM-dd', 'es-AR'),/*  Validators.required */],
    horario: [formatDate(Date.now(), 'hh:mm', 'es-AR'),/*  Validators.required */],
    pagado: ['true', /* Validators.required */],
    estado: ['', /* Validators.required */],
    sintomas: ['', /* Validators.required */],
    diagnostico: ['', /* Validators.required */],
    tratamiento: ['',/*  Validators.required */],
    is_active: [''],
    id_medico: ['', /* Validators.required */],
    id_paciente: ['', /* Validators.required */],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private turnoService: TurnosService
  ) {}

  ngOnInit(): void {
    this.obtenerListaMedicos();
    this.obtenerListaPacientes();
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

  /** @describe Registra turno */
  public registrarTurno() {
    if (this.registroForm.valid) {
      this.nuevoTurno.fecha = this.fecha.value;
      this.nuevoTurno.horario = this.horario.value;
      this.nuevoTurno.pagado = this.pagado.value;
      this.nuevoTurno.estado = this.estado.value;
      this.nuevoTurno.sintomas = this.sintomas.value;
      this.nuevoTurno.diagnostico = this.diagnostico.value;
      this.nuevoTurno.tratamiento = this.tratamiento.value;
      this.nuevoTurno.is_active = true;
      this.nuevoTurno.id_medico = this.id_medico.value;
      this.nuevoTurno.id_paciente = this.id_paciente.value;

      this.turnoService.registrarTurno(this.nuevoTurno).subscribe({
        next: (turnoData) => {
          Swal.fire({
            icon: 'success',
            title: `Creado`,
            text: `Se ha agreagdo el turno.`,
            timer: 3000,
          }).then(() => {
            this.registroForm.reset();
            window.location.reload();
          });
        },
        error: (errorData) => {
          console.error(errorData);
          this.registroForm.reset();
          Swal.fire('Error', 'No se pudo crear el turno.', 'error');
        },
        complete: () => {},
      });
    } else {
      console.info('formulario invalido');
      this.registroForm.markAllAsTouched();
    }
  }
}
