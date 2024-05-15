import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { SuscripcionComponent } from './ecommerce/suscripcion/suscripcion.component';
import { FormComponent } from './ecommerce/form/form.component';
import { FormEditComponent } from './ecommerce/form-edit/form-edit.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { SuscripcionAdminComponent } from './ecommerce/suscripcion-admin/suscripcion-admin.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PagoComponent } from './ecommerce/pago/pago.component';
import { PagoAdminComponent } from './ecommerce/pago-admin/pago-admin.component';
import { PagoClienteComponent } from './ecommerce/pago-cliente/pago-cliente.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { DetalleEspecialidadComponent } from './pages/detalle-especialidad/detalle-especialidad.component';
import { ProtegidosModule } from './protegidos/protegidos.module';
import { UserProfileComponent } from './protegidos/pages/user-profile/user-profile.component';
import { AuthGuard } from './pages/login/auth.guard';
const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'servicios', component:EspecialidadComponent},
  {path:'detalle-servicio/:id', component: DetalleEspecialidadComponent},
  {path:'nosotros', component:NosotrosComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'registro', component:RegistroComponent},
  {path:'pago', component:PagoComponent},
  {path:'login', component:LoginComponent},
  {path:'paciente', component:PacienteComponent},
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },

  // {path:'suscripcion', component:SuscripcionComponent},
  // {path:'formSuscripcion', component:FormComponent},
  // {path:'formSuscripcionEdit', component:FormEditComponent},
  // {path:'cuenta', component:CuentaComponent},
  // {path:'adminSuscripcion', component:SuscripcionAdminComponent},
  // {path:'adminPago', component:PagoAdminComponent},
  // {path:'clientePago', component:PagoClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,ProtegidosModule]
})

export class AppRoutingModule { }
