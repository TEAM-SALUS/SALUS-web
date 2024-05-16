import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { SharedServicesComponent } from 'src/app/services/auth/shared-services/shared-services.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  userLoginOn:boolean = false;

  constructor(public sharedService: SharedServicesComponent, private loginService: LoginService, private router: Router){}
  
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(loginOn) => {
        this.userLoginOn=loginOn;
      }
    })
  }
  
  logout(){
    console.log('Cerrando sesión');
    this.loginService.logout();
    this.router.navigate(['/home']);
  }
  
  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
  }
}
