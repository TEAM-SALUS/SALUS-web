import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { SharedServicesComponent } from 'src/app/services/auth/shared-services/shared-services.component';
import { UserProfile } from 'src/app/protegidos/interfaces/user-profile';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  userLoginOn:boolean = false;
  userRol:String = "invitado";
  
  constructor(public sharedService: SharedServicesComponent, private loginService: LoginService, private router: Router){}
  
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(loginOn) => {
        this.userLoginOn=loginOn;
      }
    });
    this.loginService.currentUserRol.subscribe({
      next:(userRol) => {
        this.userRol = userRol;
      }
    });
  };
  
  logout(){
    console.log('Cerrando sesión');
    this.router.navigate(['/home']);
    //window.location.reload();
    this.loginService.logout();
  }
  
  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
    this.loginService.currentUserRol.unsubscribe();
  }
}
