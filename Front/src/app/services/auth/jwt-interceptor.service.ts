import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private loginService: LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedReq = req;
    if(sessionStorage.getItem('token')){
      clonedReq=req.clone(
        {
          setHeaders: {
            Authorization: 'Token '+sessionStorage.getItem('token')!
          }
        }
      )
    }
    return next.handle(clonedReq);
  }
}
