import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SuscriptionService } from './../../services/suscription.service'
import { CreateSuscriptionDTO, Suscription } from 'src/app/model/suscription.model';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private suscriptionService: SuscriptionService, private route: ActivatedRoute) { }
  suscripcionFormEdit: FormGroup = new FormGroup({});
  auxiliar: string = "";
  idAuxiliar: number = 0;
  precioAuxiliar: number = 0;
  suscripcionActual: Suscription = {
    id: 0,
    Precio_S: 0,
    Descripcion_S: "",
    TipoServicio_S: ""
  };

  ngOnInit(): void {
    this.suscripcionActual = history.state.suscripcion
    this.precioAuxiliar = Math.floor(this.suscripcionActual.Precio_S)
    this.idAuxiliar = this.suscripcionActual.id

    const servicios = this.suscripcionActual.Descripcion_S.split(';')

    this.suscripcionFormEdit = this.formBuilder.group({
      TipoServicio_S: [this.suscripcionActual.TipoServicio_S, [Validators.required, Validators.maxLength(25), Validators.minLength(4), Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/)]],
      Precio_S: [this.precioAuxiliar, [Validators.required, Validators.min(2000)]],
      servicios: this.formBuilder.array([], [Validators.required])
    })

    servicios.forEach((servicio: string) => {
      this.ServiciosField.push(this.formBuilder.group({
        servicio: [servicio, [Validators.required, Validators.minLength(5)]]
      }))
    })
  }


  get ServiciosField(): FormArray {
    return this.suscripcionFormEdit.get('servicios') as FormArray;
  }


  addServiciosField() {
    const servicio = this.formBuilder.group({
      servicio: ["", [Validators.required, Validators.minLength(5)]]
    })
    this.ServiciosField.push(servicio);
  }

  get TipoServicio_S() {
    return this.suscripcionFormEdit.get('TipoServicio_S');
  }

  get Precio_S() {
    return this.suscripcionFormEdit.get('Precio_S');
  }


  editarSuscripcion() {
    if (this.suscripcionFormEdit.valid) {
      const data = this.suscripcionFormEdit.value
      let auxiliar = parseInt(JSON.stringify(data.Precio_S))
      const suscription: Suscription = {
        id: this.idAuxiliar,
        Descripcion_S: JSON.stringify(data.servicios),
        TipoServicio_S: JSON.stringify(data.TipoServicio_S).replace(/"/g, ''),
        Precio_S: auxiliar
      }
      const info = JSON.parse(suscription.Descripcion_S);
      const services = info.map((obj: any) => obj.servicio)
      suscription.Descripcion_S = services?.join(";")

      this.suscriptionService.updateSuscription(suscription.id, suscription)
        .subscribe(data => {
          console.log(data)
        })

      this.router.navigateByUrl('/adminSuscripcion');
      this.suscripcionFormEdit.reset();
    }
    else {
      this.suscripcionFormEdit.markAllAsTouched();
    }
  }


  eliminarSuscripcion(){
    const idDelete = this.idAuxiliar
    console.log("Vamos a eliminar al ID:", idDelete)
  }

  eliminarInput(i: number) {
    this.ServiciosField.removeAt(i)
  }



}
