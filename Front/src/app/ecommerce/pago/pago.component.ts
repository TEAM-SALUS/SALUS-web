import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SuscriptionService } from 'src/app/services/suscription.service';
import { Suscription } from 'src/app/model/suscription.model';
import { Ventas } from 'src/app/model/venta.model';
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { ITurno } from 'src/app/model/iturno';
import { EstadoTurno } from 'src/app/enums/estado-turno';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent implements OnInit {
  vencimiento: string = '';
  idAuxiliar: number = 0;
  precioAuxiliar: number = 0;
  pacienteData: any = {};
  pagAlert: string = '';
  suscripcionActual: Suscription = {
    id: 0,
    Precio_S: 0,
    Descripcion_S: '',
    TipoServicio_S: '',
  };

  public tipo_pago?: string;
  public fecha?: string;
  public horario?: string;
  public id_medico?: number;
  public id_paciente?: number|string|null;
  public nuevoTurno!: ITurno;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ventaService: VentaService,
    private suscriptionService: SuscriptionService,
    private activateRouter: ActivatedRoute,
    private turnosService:TurnosService,
  ) {}

  ngOnInit(): void {
    this.obtenerParametrosPorUrl();
  }

  pagoForm = this.formBuilder.group({
    nroTarjeta: [
      '',
      [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(16),
        Validators.pattern(/^[0-9]+$/),
      ],
    ],
    vencimientoTarjeta: [
      '',
      [Validators.required, Validators.pattern(/^[0-9]+$/)],
    ],
    codSeguridad: [
      '',
      [
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3),
        Validators.pattern(/^[0-9]+$/),
      ],
    ],
    nombre: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/),
      ],
    ],
    dni: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern(/^[0-9]+$/),
      ],
    ],
    email: [
      '',
      [Validators.required, Validators.minLength(4), Validators.email],
    ],
  });

  get nroTarjeta() {
    return this.pagoForm.controls.nroTarjeta;
  }

  get vencimientoTarjeta() {
    return this.pagoForm.controls.vencimientoTarjeta;
  }

  get codSeguridad() {
    return this.pagoForm.controls.codSeguridad;
  }

  get nombre() {
    return this.pagoForm.controls.nombre;
  }

  get dni() {
    return this.pagoForm.controls.dni;
  }

  get email() {
    return this.pagoForm.controls.email;
  }

  nuevoPago() {
    if (this.pagoForm.valid) {
      switch (this.tipo_pago) {
        case 'turno':
          this.nuevoTurno.fecha = this.fecha;
          this.nuevoTurno.horario = this.horario;
          this.nuevoTurno.pagado = true;
          this.nuevoTurno.estado = EstadoTurno.PENDIENTE;
          this.nuevoTurno.id_medico = this.id_medico;
          this.nuevoTurno.id_paciente = this.id_paciente;

          /* this.nuevoTurno.fecha = "2024-06-10";
          this.nuevoTurno.horario = "7:50";
          this.nuevoTurno.pagado = true;
          this.nuevoTurno.estado = EstadoTurno.PENDIENTE;
          this.nuevoTurno.id_medico = this.id_medico;
          this.nuevoTurno.id_paciente = this.id_paciente; */

          this.turnosService.registrarTurno(this.nuevoTurno).subscribe({
            next: (turnoData) => {
            },
            error: (errorData) => {
            },
            complete: () => {              
              Swal.fire({
                icon: 'success',
                title: `Su pago ha sido exitoso`,
                text: `Se ha confirmado el turno`,
              });
              this.router.navigateByUrl('/home');
              this.pagoForm.reset();
            }
          });

          break;

        case 'ventas':
          const ventas: Partial<Ventas> = {
            TotalVenta_V: this.precioAuxiliar,
            id_S: this.idAuxiliar,
            id_UP: this.pacienteData.id,
          };

          this.ventaService.createVenta(ventas).subscribe((data) => {
            console.log('Data venta');
            console.log(data);
          });
          Swal.fire({
            icon: 'success',
            title: `Su suscripción ha sido exitosa`,
            text: `Se ha debitado $${this.precioAuxiliar}.00`,
          });
          this.router.navigateByUrl('/clientePago');
          this.pagoForm.reset();
          break;

        default:
          break;
      }
    } else {
      this.pagoForm.markAllAsTouched();
    }
  }

  formatVencimiento(): void {
    const maxLength = 5;
    let formattedValue = this.vencimiento
      .replace(/\D/g, '')
      .substring(0, maxLength);

    if (formattedValue.length > 2) {
      const month = parseInt(formattedValue.substring(0, 2));

      // Validate month
      if (month < 1 || month > 12) {
        formattedValue = '12';
      }
    }

    this.vencimiento = formattedValue;
  }

  private obtenerParametrosPorUrl() {
    this.id_paciente = sessionStorage.getItem('id');
    this.activateRouter.params.subscribe((params: Params) => {
      this.tipo_pago = params['tipo_pago'];
      switch (this.tipo_pago) {
        case 'turno':
          this.fecha = formatDate(params['fecha_hora'], 'yyyy-MM-dd', 'es-ar');
          this.horario = formatDate(params['fecha_hora'], 'HH:mm', 'es-AR');
          this.id_medico = params['id_medico'];
          break;
        case 'ventas':
          this.suscripcionActual = history.state.suscripcion;
          this.precioAuxiliar = Math.floor(this.suscripcionActual.Precio_S);
          this.idAuxiliar = this.suscripcionActual.id;

          const pacienteDataString = localStorage.getItem('pacienteData');
          if (pacienteDataString) {
            this.pacienteData = JSON.parse(pacienteDataString);
            console.log('Que paciente llega?');
            console.log(this.pacienteData);
          }
          break;

        default:
          break;
      }
    });
  }
}
