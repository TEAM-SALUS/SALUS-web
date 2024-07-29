import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { HorarioAtencionInterface } from 'src/app/model/horarios-atencion';
import { IMedico } from 'src/app/model/i-medico';
import { IUsuario } from 'src/app/model/i-usuario';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HorariosAtencionService } from 'src/app/services/horarios-atencion.service';
import { MedicoService } from 'src/app/services/medico.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-form-medico',
  templateUrl: './c-form-medico.component.html',
  styleUrls: ['./c-form-medico.component.css'],
})
export class CFormMedicoComponent implements OnInit {
  public nuevoMedico: IMedico | any = {};
  public previsualizacion: string = '';
  public especialidadLista: EspecialidadInterface[] = [];
  public horarioAtencionLista: HorarioAtencionInterface[] = [];
  public usuarioLista: IUsuario[] = [];

  public registroForm = this.formBuilder.group({
    matricula: ['', [Validators.required, Validators.maxLength(11)]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    clave: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.maxLength(15)]],
    foto: ['', Validators.required],
    is_active: [true, Validators.required],
    id_especialidad: ['', Validators.required],
    id_horario: ['', Validators.required],
    medicoUser: ['', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private especialidadService: EspecialidadesService,
    private horariosAtencionService: HorariosAtencionService,
    private usuarioService: UsuarioService,
    private sanitizer: DomSanitizer,
    private medicoService: MedicoService
  ) {}

  ngOnInit(): void {
    this.obtenerListaEspecialidades();
    this.obtenerListaHorarios();
    this.obtenerListaUsuarios();
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

  /** @description Obtiene lista de especialidades */
  private obtenerListaEspecialidades() {
    this.especialidadService.getEspecialidad().subscribe({
      next: (especialidadData) => {
        this.especialidadLista = especialidadData;
      },
    });
  }

  /** @description Obtiene lista de horarios */
  private obtenerListaHorarios() {
    this.horariosAtencionService.getHorarioAtencion().subscribe({
      next: (horarioAtencionData) => {
        this.horarioAtencionLista = horarioAtencionData;
      },
    });
  }

  /** @description Obtiene lista de usuarios */
  private obtenerListaUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarioData) => {
        this.usuarioLista = usuarioData;
      },
    });
  }

  /** @describe Registra medico */
  public registrarMedico() {
    if (this.registroForm.valid) {
      this.nuevoMedico.matricula = this.matricula.value;
      this.nuevoMedico.nombre = this.nombre.value;
      this.nuevoMedico.apellido = this.apellido.value;
      this.nuevoMedico.email = this.email.value;
      this.nuevoMedico.clave = this.clave.value;
      this.nuevoMedico.telefono = this.telefono.value;
      this.nuevoMedico.is_active = true;
      this.nuevoMedico.id_especialidad = this.id_especialidad.value;
      this.nuevoMedico.id_horario = this.id_horario.value;
      this.nuevoMedico.medicoUser = this.medicoUser.value;

      const formData = new FormData();
      formData.append('matricula', this.nuevoMedico.matricula);
      formData.append('nombre', this.nuevoMedico.nombre);
      formData.append('apellido', this.nuevoMedico.apellido);
      formData.append('email', this.nuevoMedico.email);
      formData.append('clave', this.nuevoMedico.clave);
      formData.append('telefono', this.nuevoMedico.telefono);
      formData.append('foto', this.nuevoMedico.foto);
      formData.append('is_active', this.nuevoMedico.is_active);
      formData.append('id_especialidad', this.nuevoMedico.id_especialidad);
      formData.append('id_horario', this.nuevoMedico.id_horario);
      formData.append('medicoUser', this.nuevoMedico.medicoUser);

      this.medicoService.registrarMedico(formData).subscribe({
        next: (medicoData) => {
          Swal.fire({
            icon: 'success',
            title: `Creado`,
            text: `Se ha agreagdo el medico.`,
            timer: 3000,
          }).then(() => {
            this.registroForm.reset();
            window.location.reload();
          });
        },
        error: (errorData) => {
          console.error(errorData);
          this.registroForm.reset();
          Swal.fire('Error', 'No se pudo crear el medico.', 'error');
        },
        complete: () => {},
      });
    } else {
      console.info('formulario invalido');
      this.registroForm.markAllAsTouched();
    }
  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    this.extraerBase64(file).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    });
    this.nuevoMedico.foto = file;
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
