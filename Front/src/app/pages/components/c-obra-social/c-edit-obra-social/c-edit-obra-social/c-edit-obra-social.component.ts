import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IObraSocial } from 'src/app/model/i-obra-social';
import { ModalService } from 'src/app/services/modal.service';
import { ObraSocialService } from 'src/app/services/obra-social.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-edit-obra-social',
  templateUrl: './c-edit-obra-social.component.html',
  styleUrls: ['./c-edit-obra-social.component.css'],
})
export class CEditObraSocialComponent implements OnInit, OnDestroy {
  public obraSocial: IObraSocial | any = {};
  public previsualizacion: string = '';

  public registroForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    foto: ['', Validators.required],
  });

  public constructor(
    private formBuilder: FormBuilder,
    private obraSocialService: ObraSocialService,
    private modalService: ModalService,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.obtenerObraSocial();
  }

  public ngOnDestroy(): void {
    this.modalService.obraSocialEditar.unsubscribe;
  }

  public get nombre() {
    return this.registroForm.controls.nombre;
  }

  public get foto() {
    return this.registroForm.controls.foto;
  }

  /** @description Obtiene obra social por Behavior Subject */
  private obtenerObraSocial() {
    this.modalService.obraSocialEditar.subscribe({
      next: (obraSocialEditarData) => {
        this.obraSocial = obraSocialEditarData;
      },
    });
  }

  /** @description Edita obra social por Behavior Subject*/
  public editarObraSocial() {
    if (this.registroForm.valid) {
      this.obraSocial.nombre = this.nombre.value;
      this.obraSocial.is_active = true;

      const formData = new FormData();
      formData.append('nombre', this.obraSocial.nombre);
      formData.append('foto', this.obraSocial.foto);
      formData.append('is_active', this.obraSocial.is_active);

      console.log('OBRA SOCIAL', this.obraSocial);

      this.obraSocialService
        .editarObraSocial(this.obraSocial.id, formData)
        .subscribe({
          next: (obraSocialData) => {
            this.obraSocial = obraSocialData;
            Swal.fire({
              icon: 'success',
              title: `Editado`,
              text: `Se ha actualizado la obra social.`,
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
              text: 'No se pudo editar la obra social.',
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
    this.obraSocial.foto = file;
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
