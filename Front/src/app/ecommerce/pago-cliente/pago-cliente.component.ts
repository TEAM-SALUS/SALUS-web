import { Component, OnInit } from '@angular/core';
import { EMPTY, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { Client } from 'src/app/model/client.model';
import { Suscription } from 'src/app/model/suscription.model';
import { Ventas } from 'src/app/model/venta.model';
import { ClientService } from 'src/app/services/client.service';
import { SuscriptionService } from 'src/app/services/suscription.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-pago-cliente',
  templateUrl: './pago-cliente.component.html',
  styleUrls: ['./pago-cliente.component.css']
})
export class PagoClienteComponent implements OnInit {

  myVentas: Ventas[] = []
  mySuscriptions: Suscription[] = []
  myClients: Partial<Client> = {};
  siVentas: boolean = true;
  pacienteData: any = {};
  constructor(private ventaService: VentaService, private clientService: ClientService, private suscriptionService: SuscriptionService){}

  ngOnInit(): void {
    const pacienteDataString = localStorage.getItem('pacienteData');
    if (pacienteDataString) {
      this.pacienteData = JSON.parse(pacienteDataString);
      console.log("Que paciente llega?")
      console.log(this.pacienteData)
    }

    this.ventaService.getAllVentas()
  .pipe(
    switchMap(ventas => {

      const filteredVentas = ventas.filter(venta => venta.id_UP === this.pacienteData.id);
      if (filteredVentas.length === 0) {
        this.siVentas = false; // No hay ventas
        console.log(`No existen ventas con ID igual a ${this.pacienteData.id}`);
        return of([]); // Retorna un observable vacío si no hay ventas con id_UP igual a 1
      }
      this.siVentas = true;
      const observables = filteredVentas.map(venta => {
        const clientObs$ = this.clientService.getClient(venta.id_UP);
        const suscriptionObs$ = this.suscriptionService.getSuscription(venta.id_S);

        return forkJoin([clientObs$, suscriptionObs$]).pipe(
          map(([clientData, suscriptionData]) => {
            venta.Nombre_UP = clientData.Nombre_UP;
            venta.Apellido_UP = clientData.Apellido_UP;
            venta.Email_UP = clientData.Email_UP;
            venta.TipoServicio_S = suscriptionData.TipoServicio_S;
            venta.Precio_S = suscriptionData.Precio_S;
            const fechaVenta = new Date(venta.FechaVenta_V);
            const fechaFin = new Date(fechaVenta.getTime() + 30 * 24 * 60 * 60 * 1000);
            venta.FechaFin_V = fechaFin;
            return venta;
          })
        );
      });

      return forkJoin(observables).pipe(
        catchError(error => {
          console.log('Error al obtener los datos de las ventas:', error);
          return EMPTY; // Retorna un observable vacío en caso de error
        })
      );
    })
  )
  .subscribe(data => {
    this.myVentas = data;
    console.log(data);
  })
  }

}
