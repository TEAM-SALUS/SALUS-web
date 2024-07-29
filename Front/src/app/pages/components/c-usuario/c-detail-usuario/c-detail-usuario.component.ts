import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/model/i-usuario';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-c-detail-usuario',
  templateUrl: './c-detail-usuario.component.html',
  styleUrls: ['./c-detail-usuario.component.css'],
})
export class CDetailUsuarioComponent implements OnInit, OnDestroy {
  public usuario!: IUsuario;

  public constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  ngOnDestroy(): void {
    this.modalService.usuarioDetalle.unsubscribe;
  }

  /** @description Obtiene usuario por Behavior Subject */
  private obtenerUsuario() {
    this.modalService.usuarioDetalle.subscribe({
      next: (usuarioDetalleData) => {
        this.usuario = usuarioDetalleData;
      },
    });
  }

  /** @description Convierte password hash a string*/
  public convertirString(arg0: any) {
    return String(arg0).toString;
  }

  /** @description Formatea hora Date yyyy-MM-dd HH:MM */
  public convertirFechaHora(arg0: any) {
    return formatDate(new Date(arg0), 'yyyy-MM-dd HH:MM', 'es-AR');
  }
}
