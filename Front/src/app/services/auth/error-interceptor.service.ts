import { Injectable } from '@angular/core';
import {
  HttpEvent, 
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {
  Observable,
  catchError,
  throwError
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request).pipe(
        catchError(err => {
          /* if(err.status === 401) {
            console.log("llegamos a INTERCEPTOR 401");
            sessionStorage.removeItem('userToken');
            sessionStorage.removeItem('userLoginOn');
            sessionStorage.removeItem('email');
          } else if(err.status === 400) {
            console.log("llegamos a INTERCEPTOR 400");
          } */
          switch ( err.status ) {
            case 400:
              // statement 1
              err.error.message = "Algo fallo, intente nuevamente";
              break;
            case 401:
              // statement 2
              err.error.message = "Acceso denegado, credenciales invalidas";
              break;
              case 403:
                // statement 3
                err.error.message = "Consulte adminstracion, no posee credenciales para recurso ";
                break;
            case 404:
              // statement 4
              err.error.message = "Busque una time machine, recurso no encontrado";
              break;
            default: 
              // statement n
              err.error.message = "Error desconocido, error no encontrado";
              break;
          }

          let error = err.error.message || err.statusText;
          return throwError(() => error);
        })
      );
    }
}
