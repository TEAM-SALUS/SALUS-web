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
import { MedicosAdminComponent } from './medicos/medicos-admin/medicos-admin.component';
import { FormDoctorComponent } from './medicos/form-doctor/form-doctor.component';
import { FormEditDoctorComponent } from './medicos/form-edit-doctor/form-edit-doctor.component';
import { PagoComponent } from './ecommerce/pago/pago.component';
import { PagoAdminComponent } from './ecommerce/pago-admin/pago-admin.component';
import { PagoClienteComponent } from './ecommerce/pago-cliente/pago-cliente.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { DetalleEspecialidadComponent } from './pages/detalle-especialidad/detalle-especialidad.component';
import {CProfesionalComponent} from './pages/components/c-profesional/c-profesional.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'servicios', component:EspecialidadComponent},
  {path:'detalle-servicio/:id', component: DetalleEspecialidadComponent},
  {path:'nosotros', component:NosotrosComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'registro', component:RegistroComponent},
  {path:'suscripcion', component:SuscripcionComponent},
  {path:'login', component:LoginComponent},
  {path:'formSuscripcion', component:FormComponent},
  {path:'formSuscripcionEdit', component:FormEditComponent},
  {path:'cuenta', component:CuentaComponent},
  {path:'adminSuscripcion', component:SuscripcionAdminComponent},
  {path:'paciente', component:PacienteComponent},
  {path:'adminMedico', component:MedicosAdminComponent},
  {path:'formDoctor', component:FormDoctorComponent},
  {path:'formDoctorEdit', component:FormEditDoctorComponent},
  {path:'pago', component:PagoComponent},
  {path:'adminPago', component:PagoAdminComponent},
  {path:'clientePago', component:PagoClienteComponent},
  {path:'profesionales', component:CProfesionalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
