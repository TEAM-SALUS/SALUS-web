import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { SuscripcionComponent } from './ecommerce/suscripcion/suscripcion.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './ecommerce/form/form.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { SuscripcionAdminComponent } from './ecommerce/suscripcion-admin/suscripcion-admin.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { SharedServicesComponent } from './services/auth/shared-services/shared-services.component';
import { FormsModule } from '@angular/forms';
import { FormEditComponent } from './ecommerce/form-edit/form-edit.component';
import { PagoComponent } from './ecommerce/pago/pago.component';
import { PagoAdminComponent } from './ecommerce/pago-admin/pago-admin.component';
import { PagoClienteComponent } from './ecommerce/pago-cliente/pago-cliente.component';
import { CEspecialidadComponent } from './pages/components/c-especialidad/c-especialidad.component';
import { CDetalleEspecialidadComponent } from './pages/components/c-detalle-especialidad/c-detalle-especialidad.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { DetalleEspecialidadComponent } from './pages/detalle-especialidad/detalle-especialidad.component';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
<<<<<<< HEAD
import { ProfesionalesComponent } from './pages/profesionales/profesionales.component';
import { CProfesionalComponent } from './pages/components/c-profesionales/c-profesionales.component';
import { ProtegidosModule } from './protegidos/protegidos.module';
=======
>>>>>>> 9a953567f824673a6b0abad1209b7795f9e83433

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    NosotrosComponent,
    ContactoComponent,
    SuscripcionComponent,
    LoginComponent,
    FormComponent,
    SuscripcionAdminComponent,
    PacienteComponent,
    RegistroComponent,
    SharedServicesComponent,
    FormEditComponent,
    PagoComponent,
    PagoAdminComponent,
    PagoClienteComponent,
    CEspecialidadComponent,
    CDetalleEspecialidadComponent,
    EspecialidadComponent,
    DetalleEspecialidadComponent,
<<<<<<< HEAD
    ProfesionalesComponent,
    CProfesionalComponent,
=======
>>>>>>> 9a953567f824673a6b0abad1209b7795f9e83433
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ProtegidosModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true},
    SharedServicesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
