import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-form-especialidad',
  templateUrl: './c-form-especialidad.component.html',
  styleUrls: ['./c-form-especialidad.component.css'],
})
export class CFormEspecialidadComponent implements OnInit {
  public nuevaEspecialidad: EspecialidadInterface | any = {};
  public previsualizacion: string = '';

  public registroForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    precio: ['', Validators.required],
    duracion: ['', Validators.required],
    foto: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private especialidadService: EspecialidadesService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  public ngOnInit(): void {}

  public get nombre() {
    return this.registroForm.controls.nombre;
  }
  public get precio() {
    return this.registroForm.controls.precio;
  }
  public get duracion() {
    return this.registroForm.controls.duracion;
  }
  public get foto() {
    return this.registroForm.controls.foto;
  }
  public get descripcion() {
    return this.registroForm.controls.descripcion;
  }

  /** @description Registra servicio */
  public registrarServicio() {
    if (this.registroForm.valid) {
      this.nuevaEspecialidad.nombre = this.nombre.value;
      this.nuevaEspecialidad.precio = this.precio.value;
      this.nuevaEspecialidad.duracion = this.duracion.value;
      this.nuevaEspecialidad.descripcion = this.descripcion.value;
      this.nuevaEspecialidad.is_active = true;

      const formData = new FormData();
      formData.append('nombre', this.nuevaEspecialidad.nombre);
      formData.append('precio', this.nuevaEspecialidad.precio);
      formData.append('duracion', this.nuevaEspecialidad.duracion);
      formData.append('descripcion', this.nuevaEspecialidad.descripcion);
      formData.append('is_active', this.nuevaEspecialidad.is_active);
      formData.append('foto', this.nuevaEspecialidad.foto);

      this.especialidadService.registrarEspecialidad(formData).subscribe({
        next: (especialidadData) => {
          console.info(especialidadData);
          Swal.fire({
            icon: 'success',
            title: `Creado`,
            text: `Se ha agreagdo la especialidad.`,
            timer: 3000,
          }).then(() => {
            this.registroForm.reset();
            //this.router.navigate(['servicios']);
            window.location.reload();
          });
        },
        error: (errorData) => {
          console.error(errorData);
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
    this.nuevaEspecialidad.foto = file;
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
