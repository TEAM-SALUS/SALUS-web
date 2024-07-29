import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IObraSocial } from 'src/app/model/i-obra-social';
import { ObraSocialService } from 'src/app/services/obra-social.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-form-obra-social',
  templateUrl: './c-form-obra-social.component.html',
  styleUrls: ['./c-form-obra-social.component.css'],
})
export class CFormObraSocialComponent implements OnInit {
  public nuevaObraSocial: IObraSocial | any = {};
  public previsualizacion: string = '';

  public registroForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    foto: ['', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private obraSocialService: ObraSocialService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  public get nombre() {
    return this.registroForm.controls.nombre;
  }

  public get foto() {
    return this.registroForm.controls.foto;
  }

  /** @description Registra obra social */
  public registrarObraSocial() {
    if (this.registroForm.valid) {
      this.nuevaObraSocial.nombre = this.nombre.value;
      this.nuevaObraSocial.is_active = true;

      const formData = new FormData();
      formData.append('nombre', this.nuevaObraSocial.nombre);
      formData.append('foto', this.nuevaObraSocial.foto);
      formData.append('is_active', this.nuevaObraSocial.is_active);

      this.obraSocialService.registrarObraSocial(formData).subscribe({
        next: (obraSocialData) => {
          Swal.fire({
            icon: 'success',
            title: `Creado`,
            text: `Se ha agreagdo la obra social.`,
            timer: 3000,
          }).then(() => {
            this.registroForm.reset();
            window.location.reload();
          });
        },
        error: (errorData) => {
          console.error(errorData);
          this.registroForm.reset();
          Swal.fire('Error', 'No se pudo crear la obra social.', 'error');
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
    this.nuevaObraSocial.foto = file;
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
