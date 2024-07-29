import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/model/i-usuario';

@Component({
  selector: 'app-c-paciente',
  templateUrl: './c-paciente.component.html',
  styleUrls: ['./c-paciente.component.css'],
})
export class CPacienteComponent implements OnInit {
  public nuevoUsuario!: IUsuario;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
