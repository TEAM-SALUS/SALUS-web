import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { HorarioAtencionInterface } from 'src/app/model/horarios-atencion';
import { IMedico } from 'src/app/model/i-medico';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HorariosAtencionService } from 'src/app/services/horarios-atencion.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-perfil-edit-medico',
  templateUrl: './c-perfil-edit-medico.component.html',
  styleUrls: ['./c-perfil-edit-medico.component.css'],
})
export class CPerfilEditMedicoComponent implements OnInit, OnDestroy {
  public medico: IMedico | any = {};
  public previsualizacion: string = '';
  public especialidadLista: EspecialidadInterface[] = [];
  public horarioAtencionLista: HorarioAtencionInterface[] = [];
  public isLoading: boolean = true;
  public errorMessage: string = '';

  public registroForm = this.formBuilder.group({
    id: ['', Validators.required],
    matricula: ['', [Validators.required, Validators.maxLength(11)]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    clave: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.maxLength(15)]],
    foto: ['', Validators.required],
    is_active: ['', Validators.required],
    id_especialidad: ['', Validators.required],
    id_horario: ['', Validators.required],
    medicoUser: ['', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private medicoService: MedicoService,
    private sanitizer: DomSanitizer,
    private especialidadService: EspecialidadesService,
    private horaAtencionService: HorariosAtencionService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.obtenerMedico();
    this.obtenerListaEspecialidades();
    this.obtenerListaHorarioAtencion();
  }

  ngOnDestroy(): void {
    this.modalService.pacientePerfilEditar.unsubscribe;
  }

  public get id() {
    return this.registroForm.controls.id;
  }

  public get matricula() {
    return this.registroForm.controls.matricula;
  }

  public get nombre() {
    return this.registroForm.controls.nombre;
  }

  public get apellido() {
    return this.registroForm.controls.apellido;
  }

  public get email() {
    return this.registroForm.controls.email;
  }

  public get clave() {
    return this.registroForm.controls.clave;
  }

  public get telefono() {
    return this.registroForm.controls.telefono;
  }

  public get foto() {
    return this.registroForm.controls.foto;
  }

  public get is_active() {
    return this.registroForm.controls.is_active;
  }

  public get id_especialidad() {
    return this.registroForm.controls.id_especialidad;
  }

  public get id_horario() {
    return this.registroForm.controls.id_horario;
  }

  public get medicoUser() {
    return this.registroForm.controls.medicoUser;
  }

  /** @description Obtiene medico por Behavior Subject */
  private obtenerMedico() {
    this.modalService.medicoPerfilEditar.subscribe({
      next: (medicoData) => {
        this.isLoading = false;
        this.medico = medicoData;
        this.obtenerMedicoDefaultForm();
      },
    });
  }

  /** @description Obtiene medico default en formulario */
  private obtenerMedicoDefaultForm() {
    this.id.setValue(this.medico.id);
    this.matricula.setValue(this.medico.matricula);
    this.nombre.setValue(this.medico.nombre);
    this.apellido.setValue(this.medico.apellido);
    this.email.setValue(this.medico.email);
    this.clave.setValue(this.medico.clave);
    this.telefono.setValue(this.medico.telefono);
    this.is_active.setValue(this.medico.is_active);
    this.id_especialidad.setValue(this.medico.id_especialidad);
    this.id_horario.setValue(this.medico.id_horario);
    this.medicoUser.setValue(this.medico.medicoUser);
  }

  /** @describe Obtiene lista de especialidades */
  private obtenerListaEspecialidades() {
    this.especialidadService.getEspecialidad().subscribe({
      next: (especialidadData) => {
        this.especialidadLista = especialidadData;
      },
    });
  }

  /** @describe Obtiene lista de horarios atencion */
  private obtenerListaHorarioAtencion() {
    this.horaAtencionService.getHorarioAtencion().subscribe({
      next: (horaAtencionData) => {
        this.horarioAtencionLista = horaAtencionData;
      },
    });
  }

  /** @description Edita medico */
  public editarMedico() {
    if (this.registroForm.valid) {
      this.medico.matricula = this.matricula.value;
      this.medico.nombre = this.nombre.value;
      this.medico.apellido = this.apellido.value;
      this.medico.email = this.email.value;
      this.medico.clave = this.clave.value;
      this.medico.telefono = this.telefono.value;
      this.medico.is_active = true;
      this.medico.id_especialidad = this.id_especialidad.value;
      this.medico.id_horario = this.id_horario.value;
      this.medico.medicoUser = this.medicoUser.value;

      const formData = new FormData();
      formData.append('matricula', this.medico.matricula);
      formData.append('nombre', this.medico.nombre);
      formData.append('apellido', this.medico.apellido);
      formData.append('email', this.medico.email);
      formData.append('clave', this.medico.clave);
      formData.append('telefono', this.medico.telefono);
      formData.append('foto', this.medico.foto);
      formData.append('is_active', this.medico.is_active);
      formData.append('id_especialidad', this.medico.id_especialidad);
      formData.append('id_horario', this.medico.id_horario);
      formData.append('medicoUser', this.medico.medicoUser);

      this.medicoService.editarMedico(this.medico.id, formData).subscribe({
        next: (medicoData) => {
          Swal.fire({
            icon: 'success',
            title: `Editado`,
            text: `Se ha actualizado el medico.`,
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
            text: 'No se pudo editar el medico.',
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

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    this.extraerBase64(file).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    });
    this.medico.foto = file;
  }

  public extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            blob: $event,
            image,
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            blob: $event,
            image,
            base: null,
          });
        };
      } catch (e) {
        resolve(null);
      }
    });
}
