import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from '../../user-profile.service';
import { UserProfile } from '../../interfaces/user-profile';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
import { LoggedInUser, Update } from 'src/app/services/auth/auth';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  userProfile: UserProfile | null = null;
  updateProfile: UserProfile | null = null;
  actualizarPerfil: UserProfile | null = null;
  updateData: Update | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  

  constructor(
    private userProfileService: UserProfileService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private cdr: ChangeDetectorRef
    
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
  
  guardarCambios(): void {
    
    if (this.userProfile?.id && this.userProfile.pacienteUser ) {
      this.userProfileService.updateProfile(this.userProfile.id.toString(), this.userProfile) && this.userProfileService.actualizarPerfil (this.userProfile.pacienteUser.toString(), this.userProfile).subscribe({
        next: (data) => {
          console.log('Perfil actualizado:', data);
          
          Swal.fire('Éxito', 'El perfil ha sido actualizado.', 'success').then(() => {
            this.router.navigateByUrl(`user-profile/${data.pacienteUser}`);
          });
        },
        error: (error) => {
          console.log('Error al actualizar el perfil:', error);
          this.errorMessage = 'No se pudo actualizar el perfil.';
          Swal.fire('Error', this.errorMessage, 'error');
        }
      });
    } else {
      this.errorMessage = 'No se proporcionaron datos de usuario.';
      Swal.fire('Error', this.errorMessage, 'error');
    }
  }
  }

  // guardarCambios(): void {
  //   const userId = this.activatedRoute.snapshot.paramMap.get('id');
  //   const patientId = this.activatedRoute.snapshot.paramMap.get('pacienteUser');
    
  //   if (userId && patientId && this.editarPerfil && this.updateData) {
  //     console.log('Datos enviados para usuario:', this.updateData);
      
  //     // Actualizar perfil de usuario
  //     this.userProfileService.updateProfile(userId, this.updateData).subscribe({
  //       next: (data) => {
  //         console.log('Perfil de usuario actualizado:', data);
          
  //         // Ahora actualizar perfil de paciente
  //         console.log('Datos enviados para paciente:', this.editarPerfil);
  //         if (this.editarPerfil) {
  //           this.userProfileService.actualizarPerfil(patientId, this.editarPerfil).subscribe({
  //             next: (patientData) => {
  //               console.log('Perfil de paciente actualizado:', patientData);
  //               Swal.fire('Éxito', 'El perfil ha sido actualizado.', 'success').then(() => {
  //                 this.router.navigate(['user-profile/', patientId]);
  //               });
  //             },
  //             error: (error) => {
  //               console.log('Error al actualizar el perfil de paciente:', error);
  //               this.errorMessage = 'No se pudo actualizar el perfil del paciente.';
  //               Swal.fire('Error', this.errorMessage, 'error');
  //             }
  //           });
  //         }
  //       },
  //       error: (error) => {
  //         console.log('Error al actualizar el perfil del usuario:', error);
  //         this.errorMessage = 'No se pudo actualizar el perfil del usuario.';
  //         Swal.fire('Error', this.errorMessage, 'error');
  //       }
  //     });
  //   } else {
  //     this.errorMessage = 'No se proporcionaron IDs válidos de usuario o paciente, o datos de usuario.';
  //     Swal.fire('Error', this.errorMessage, 'error');
  //   }
  // }
  
  



