import { Injectable } from '@angular/core';
import { IUsuario } from '../model/i-usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegistroUserToken } from '../model/i-registro-user-token';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url: string = 'http://localhost:8000/api/v1/';

  constructor(private http: HttpClient) {}

  /** @description Obtiene listado de Usuarios */
  public obtenerUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(`${this.url}usuario`);
  }

  /** @description Registra nuevo usuario @deprecated carga mal el password*/
  public registrarUsuario(nuevoUsuario: IUsuario) {
    return this.http.post<IUsuario>(`${this.url}usuario/`, nuevoUsuario);
  }

  /**  @description Elimina usuario por id*/
  public borrarUsuario(id: number | undefined): Observable<null> {
    return this.http.delete<null>(`${this.url}usuario/${id}`);
  }

  /** @description Edita Usuario por id */
  public editarUsuario(usuario:IUsuario):Observable<IUsuario>{
    return this.http.put<IUsuario>(`${this.url}usuario/${usuario.id}/`,usuario);
  }

  /* seccion token */
  /** @description Registra nuevo usuario token*/
  public registrarUsuarioToken(
    nuevoUsuario: IUsuario
  ): Observable<IRegistroUserToken> {
    return this.http.post<IRegistroUserToken>(
      `${this.url}registro`,
      nuevoUsuario
    );
  }

  /** @description Obtiene usuario por token  */
  public obtenerUsuarioToken(): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.url}profile`);
  }

  /** @description Elimina usuario por token */
  public borrarUsuarioToken(): Observable<null> {
    return this.http.delete<null>(`${this.url}profile`);
  }
  /** @description Edita usuario por token */
  public editarUsuarioToken(usuario: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(`${this.url}profile`,usuario);
  }
}
