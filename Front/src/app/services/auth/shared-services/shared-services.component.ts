import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-services',
  templateUrl: './shared-services.component.html',
  styleUrls: ['./shared-services.component.css']
})
export class SharedServicesComponent {
  isLoggedIn: boolean = false;
  isRegistered: boolean = false;
  isAdmin: boolean = false;


  constructor() { }
}
