import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserProfileService } from '../../user-profile.service';
import { UserProfile } from '../../interfaces/user-profile';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private userProfileService: UserProfileService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private cdr: ChangeDetectorRef // Añade esto
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.userProfileService.getUserProfile(id).subscribe({
        next: (data) => {
          console.log(data);
          this.userProfile = data;
          this.userProfile = data[0];
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = 'No se pudieron cargar los datos del perfil.';
          Swal.fire('Error', this.errorMessage, 'error');
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.errorMessage = 'No se proporcionó un ID de usuario válido.';
      Swal.fire('Error', this.errorMessage, 'error');
      this.router.navigate(['/']);
      this.cdr.detectChanges(); 
    }
  }
}