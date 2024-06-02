import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserProfileComponent,
    EditarPerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    UserProfileComponent,
    EditarPerfilComponent
  ]
})
export class ProtegidosModule { }
