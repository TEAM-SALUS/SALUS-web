import { Component, OnInit } from '@angular/core';
import { SuscriptionService } from './../../services/suscription.service'
import { CreateSuscriptionDTO, Suscription } from 'src/app/model/suscription.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.css']
})
export class SuscripcionComponent implements OnInit{


  mySuscriptions: Suscription[] = [];

  choseSuscription: {} = {};

  constructor(private suscriptionService: SuscriptionService, private router: Router){
  }

  ngOnInit(): void {
    this.suscriptionService.getAllSuscriptions()
    .subscribe(data => {
      this.mySuscriptions = data
    })
  }

  getSuscription(){
    console.log(this.mySuscriptions)
  }

  pagarSuscripcion(data: Suscription){
    console.log(data)
    this.router.navigate(['/pago'], {state: {suscripcion: data}})
  }


}
