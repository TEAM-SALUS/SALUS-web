import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, forkJoin, map, switchMap, zip } from 'rxjs';
import { Client } from 'src/app/model/client.model';
import { Suscription } from 'src/app/model/suscription.model';
import { Ventas } from 'src/app/model/venta.model';
import { ClientService } from 'src/app/services/client.service';
import { SuscriptionService } from 'src/app/services/suscription.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-pago-admin',
  templateUrl: './pago-admin.component.html',
  styleUrls: ['./pago-admin.component.css']
})
export class PagoAdminComponent implements OnInit{

  myVentas: Ventas[] = []
  mySuscriptions: Suscription[] = []
  myClients: Partial<Client> = {};
  constructor(private ventaService: VentaService, private clientService: ClientService, private suscriptionService: SuscriptionService){}

  ngOnInit(): void {
    this.ventaService.getAllVentas()
  .pipe(
    switchMap(ventas => {
      const observables = ventas.map(venta => {
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

      return forkJoin(observables);
    })
  )
  .subscribe(data => {
    this.myVentas = data;
    console.log(data);
  });
  }
}
