import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IObraSocial } from 'src/app/model/i-obra-social';
import { IPaciente } from 'src/app/model/i-paciente';
import { IUsuario } from 'src/app/model/i-usuario';
import { ObraSocialService } from 'src/app/services/obra-social.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-form-paciente',
  templateUrl: './c-form-paciente.component.html',
  styleUrls: ['./c-form-paciente.component.css'],
})
export class CFormPacienteComponent implements OnInit {
  public nuevoPaciente: IPaciente | any = {};
  public previsualizacion: string = '';
  public usuarioLista: IUsuario[] = [];
  public obraSocialLista: IObraSocial[] = [];

  public registroForm = this.formBuilder.group({
    dni_paciente: ['',Validators.required],
    nombre: ['',Validators.required],
    apellido: ['',Validators.required],
    email: ['',Validators.required],
    clave: ['',Validators.required],
    telefono: ['',Validators.required],
    foto: ['',Validators.required],
    /* is_active: [''], */
    id_obra_social: ['', Validators.required],
    pacienteUser: ['', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private sanitizer: DomSanitizer,
    private usuarioService: UsuarioService,
    private obraSocialService: ObraSocialService
  ) {}

  ngOnInit(): void {
    this.obtenerListaUsuarios();
    this.obtenerListaObrasSociales();
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

  /* public get is_active() {
    return this.registroForm.controls.is_active;
  } */

  public get id_obra_social() {
    return this.registroForm.controls.id_obra_social;
  }

  public get pacienteUser() {
    return this.registroForm.controls.pacienteUser;
  }

  /** @description Obtiene lista de usuarios */
  private obtenerListaUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarioData) => {
        this.usuarioLista = usuarioData;
      },
    });
  }

  /** @describe Obtiene lista de obras sociales */
  private obtenerListaObrasSociales() {
    this.obraSocialService.obtenerObrasSociales().subscribe({
      next: (obraSocialData) => {
        this.obraSocialLista = obraSocialData;
      },
    });
  }

  /** @description Registra paciente */
  public registrarPaciente() {
    if (this.registroForm.valid) {
      this.nuevoPaciente.dni_paciente = this.dni_paciente.value;
      this.nuevoPaciente.nombre = this.nombre.value;
      this.nuevoPaciente.apellido = this.apellido.value;
      this.nuevoPaciente.email = this.email.value;
      this.nuevoPaciente.clave = this.clave.value;
      this.nuevoPaciente.telefono = this.telefono.value;
      this.nuevoPaciente.is_active = true;
      this.nuevoPaciente.id_obra_social = this.id_obra_social.value;
      this.nuevoPaciente.pacienteUser = this.pacienteUser.value;

      const formData = new FormData();
      formData.append('dni_paciente', this.nuevoPaciente.dni_paciente);
      formData.append('nombre', this.nuevoPaciente.nombre);
      formData.append('apellido', this.nuevoPaciente.apellido);
      formData.append('email', this.nuevoPaciente.email);
      formData.append('clave', this.nuevoPaciente.clave);
      formData.append('telefono', this.nuevoPaciente.telefono);
      formData.append('foto', this.nuevoPaciente.foto);
      formData.append('is_active', this.nuevoPaciente.is_active);
      formData.append('id_obra_social', this.nuevoPaciente.id_obra_social);
      formData.append('pacienteUser', this.nuevoPaciente.pacienteUser);

      console.info('paciente user form', this.pacienteUser.value);
      console.info('paciente', this.nuevoPaciente);

      this.pacienteService.registrarPaciente(formData).subscribe({
        next: (pacienteData) => {
          console.info(pacienteData);
          Swal.fire({
            icon: 'success',
            title: `Creado`,
            text: `Se ha agreagdo el paciente.`,
            timer: 3000,
          }).then(() => {
            this.registroForm.reset();
            window.location.reload();
          });
        },
        error: (errorData) => {
          console.error(errorData);
          this.registroForm.reset();
          Swal.fire('Error', 'No se pudo crear el paciente.', 'error');
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
    this.nuevoPaciente.foto = file;
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
