import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-edit-especialidad',
  templateUrl: './c-edit-especialidad.component.html',
  styleUrls: ['./c-edit-especialidad.component.css']
})
export class CEditEspecialidadComponent implements OnInit{
  public especialidad: EspecialidadInterface|any = {};
  public previsualizacion: string="";

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
    private activatedRoute:ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.especialidad.id = this.activatedRoute.snapshot.params['id'];
    this.obtenerEspecialidad();
  }

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

  public editarEspecialidad() {
    if (this.registroForm.valid) {
      this.especialidad.nombre = this.nombre.value;
      this.especialidad.precio = this.precio.value;
      this.especialidad.duracion = this.duracion.value;
      this.especialidad.descripcion = this.descripcion.value;

      const formData = new FormData();
      formData.append('nombre',this.especialidad.nombre);
      formData.append('precio',this.especialidad.precio);
      formData.append('duracion',this.especialidad.duracion);
      formData.append('descripcion',this.especialidad.descripcion);
      formData.append('foto',this.especialidad.foto);

      this.especialidadService
        .editarEspecialidad(this.especialidad.id,formData)
        .subscribe({
          next: (especialidadData) => {
            this.especialidad = especialidadData;
          },
          error: (errorData) => {
            console.error(errorData);
          },
          complete: () => {

            Swal.fire({
                icon: 'success',
                title: `Su especialidad ha sido actualizada`,
                text: `Se ha actualizado la especialidad`,
              });
              window.location.reload();
          },
        });
    } else {
      this.registroForm.markAllAsTouched();
    }
  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    this.extraerBase64(file).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    })
    this.especialidad.foto = file;
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

    private obtenerEspecialidad() {
      this.especialidadService.getEspecialidadId(this.especialidad.id).subscribe({
        next: (especialidadData) => {
          this.especialidad = especialidadData;
        },
        complete: () => {
        },
      });
    };
}
