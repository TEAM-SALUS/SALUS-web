import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { SharedServicesComponent } from 'src/app/services/auth/shared-services/shared-services.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public sharedService: SharedServicesComponent, private loginService: LoginService, private router: Router){}

  ngOnIinit(): void {}

  logout(){
    this.loginService.logout;
    this.router.navigate(['/inicio']);
  }
}
