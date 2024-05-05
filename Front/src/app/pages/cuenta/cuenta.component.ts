import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Cuenta, CreateCuentaDTO } from 'src/app/model/cuenta.model';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit{

  myCuentas: Cuenta[] = [];

  constructor(private cuentaService: CuentaService){}

  ngOnInit(): void{
    this.cuentaService.getCuentas()
    .subscribe(data => {
      this.myCuentas = data
    })
  }

  crearCuenta(){
    this.cuentaService.crearCuenta()
  }

}
