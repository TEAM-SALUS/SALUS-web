import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPago } from '../model/i-pago';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  url: string = 'http://localhost:8000/api/v1/';

  constructor(private http: HttpClient) {}

  /** @description Obtiene listado de Pagos */
  public obtenerPagos(): Observable<IPago[]> {
    return this.http.get<IPago[]>(`${this.url}pago`);
  }

  /** @description Registra nuevo pago */
  public registrarPago(nuevoPago: IPago): Observable<IPago> {
    return this.http.post<IPago>(`${this.url}pago/`, nuevoPago);
  }

  /**  @description Elimina pago por id*/
  public borrarPago(id: number | undefined): Observable<null> {
    return this.http.delete<null>(`${this.url}pago/${id}`);
  }

  /** @description Edita Pago por id*/
  public editarPago(id: number, pago: IPago): Observable<IPago> {
    return this.http.put<IPago>(`${this.url}pago/${id}/`, pago);
  }

  // paciente
  public obtenerPagosPaciente(id: number): Observable<IPago[]> {
    return this.http.get<IPago[]>(`${this.url}pago-paciente/${id}`);
  }
}
