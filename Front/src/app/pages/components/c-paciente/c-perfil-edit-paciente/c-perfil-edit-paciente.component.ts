import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IObraSocial } from 'src/app/model/i-obra-social';
import { IPaciente } from 'src/app/model/i-paciente';
import { ModalService } from 'src/app/services/modal.service';
import { ObraSocialService } from 'src/app/services/obra-social.service';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-perfil-edit-paciente',
  templateUrl: './c-perfil-edit-paciente.component.html',
  styleUrls: ['./c-perfil-edit-paciente.component.css'],
})
export class CPerfilEditPacienteComponent implements OnInit, OnDestroy {
  public paciente: IPaciente | any = {};
  public previsualizacion: string = '';
  public obraSocialLista: IObraSocial[] = [];
  public isLoading: boolean = true;
  public errorMessage: string = '';

  public registroForm = this.formBuilder.group({
    id: ['', Validators.required],
    dni_paciente: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required],
    clave: ['', Validators.required],
    telefono: ['', Validators.required],
    foto: ['', Validators.required],
    is_active: ['', Validators.required],
    id_obra_social: ['', Validators.required],
    pacienteUser: ['', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private sanitizer: DomSanitizer,
    private obraSocialService: ObraSocialService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.obtenerPaciente();
    this.obtenerListaObrasSociales();
  }

  ngOnDestroy(): void {
    this.modalService.pacienteEditar.unsubscribe;
  }

  public get id() {
    return this.registroForm.controls.id;
  }
  public get dni_paciente() {
    return this.registroForm.controls.dni_paciente;
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
  public get id_obra_social() {
    return this.registroForm.controls.id_obra_social;
  }
  public get pacienteUser() {
    return this.registroForm.controls.pacienteUser;
  }

  /** @description Obtiene paciente por Behavior Subject */
  private obtenerPaciente() {
    this.modalService.pacientePerfilEditar.subscribe({
      next: (pacienteData) => {
        this.isLoading = false;
        this.paciente = pacienteData;
        this.obtenerPacienteDefaultForm();
      },
    });
  }

  /** @description Obtiene paciente default en formulario */
  private obtenerPacienteDefaultForm() {
    this.id.setValue(this.paciente.id);
    this.dni_paciente.setValue(this.paciente.dni_paciente);
    this.nombre.setValue(this.paciente.nombre);
    this.apellido.setValue(this.paciente.apellido);
    this.email.setValue(this.paciente.email);
    this.clave.setValue(this.paciente.clave);
    this.telefono.setValue(this.paciente.telefono);
    this.is_active.setValue(this.paciente.is_active);
    this.id_obra_social.setValue(this.paciente.id_obra_social);
    this.pacienteUser.setValue(this.paciente.pacienteUser);
  }

  /** @describe Obtiene lista de obras sociales */
  private obtenerListaObrasSociales() {
    this.obraSocialService.obtenerObrasSociales().subscribe({
      next: (obraSocialData) => {
        this.obraSocialLista = obraSocialData;
      },
    });
  }

  /** @descriptionEditar Edita paciente */
  public editarPaciente() {
    if (this.registroForm.valid) {
      this.paciente.dni_paciente = this.dni_paciente.value;
      this.paciente.nombre = this.nombre.value;
      this.paciente.apellido = this.apellido.value;
      this.paciente.email = this.email.value;
      this.paciente.clave = this.clave.value;
      this.paciente.telefono = this.telefono.value;
      this.paciente.is_active = true;
      this.paciente.id_obra_social = this.id_obra_social.value;
      this.paciente.pacienteUser = this.pacienteUser.value;

      const formData = new FormData();
      formData.append('dni_paciente', this.paciente.dni_paciente);
      formData.append('nombre', this.paciente.nombre);
      formData.append('apellido', this.paciente.apellido);
      formData.append('email', this.paciente.email);
      formData.append('clave', this.paciente.clave);
      formData.append('telefono', this.paciente.telefono);
      formData.append('foto', this.paciente.foto);
      formData.append('is_active', this.paciente.is_active);
      formData.append('id_obra_social', this.paciente.id_obra_social);
      formData.append('pacienteUser', this.paciente.pacienteUser);

      this.pacienteService
        .editarPaciente(this.paciente.id, formData)
        .subscribe({
          next: (pacienteData) => {
            Swal.fire({
              icon: 'success',
              title: `Editado`,
              text: `Se ha actualizado el paciente.`,
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
              text: 'No se pudo editar el paciente.',
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
    this.paciente.foto = file;
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
