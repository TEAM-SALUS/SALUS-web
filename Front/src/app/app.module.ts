import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { SuscripcionComponent } from './ecommerce/suscripcion/suscripcion.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ProfesionalesComponent } from './pages/profesionales/profesionales.component';
import { CProfesionalComponent } from './pages/components/c-profesionales/c-profesionales.component';
import { ProtegidosModule } from './protegidos/protegidos.module';
import { CTurnoComponent } from './pages/components/c-turno/c-turno/c-turno.component';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { TurnoComponent } from './pages/turno/turno.component';
import { TurnoDetailComponent } from './pages/turno/turno-detail/turno-detail.component';
import { FormEspecialidadComponent } from './pages/especialidad/form-especialidad/form-especialidad.component';
import { CFormEspecialidadComponent } from './pages/components/c-especialidad/c-form-especialidad/c-form-especialidad.component';
import { EditEspecialidadComponent } from './pages/especialidad/edit-especialidad/edit-especialidad.component';
import { CEditEspecialidadComponent } from './pages/components/c-especialidad/c-edit-especialidad/c-edit-especialidad.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { CPagina404Component } from './pages/components/c-pagina404/c-pagina404.component';
import { CTableEspecialidadComponent } from './pages/components/c-table-especialidad/c-table-especialidad/c-table-especialidad.component';
import { CTableObraSocialComponent } from './pages/components/c-table-obra-social/c-table-obra-social.component';
import { CObraSocialComponent } from './pages/components/c-obra-social/c-obra-social.component';
import { CFormObraSocialComponent } from './pages/components/c-obra-social/c-form-obra-social/c-form-obra-social/c-form-obra-social.component';
import { CEditObraSocialComponent } from './pages/components/c-obra-social/c-edit-obra-social/c-edit-obra-social/c-edit-obra-social.component';
import { CDetailObraSocialComponent } from './pages/components/c-obra-social/c-detail-obra-social/c-detail-obra-social/c-detail-obra-social.component';
import { CTableHorarioDeAtencionComponent } from './pages/components/c-table-horario-de-atencion/c-table-horario-de-atencion/c-table-horario-de-atencion.component';
import { CHorarioDeAtencionComponent } from './pages/components/c-horario-de-atencion/c-horario-de-atencion.component';
import { CDetailHorarioDeAtencionComponent } from './pages/components/c-horario-de-atencion/c-detail-horario-de-atencion/c-detail-horario-de-atencion.component';
import { CFormHorarioDeAtencionComponent } from './pages/components/c-horario-de-atencion/c-form-horario-de-atencion/c-form-horario-de-atencion.component';
import { CEditHorarioDeAtencionComponent } from './pages/components/c-horario-de-atencion/c-edit-horario-de-atencion/c-edit-horario-de-atencion.component';
import { CTablePacienteComponent } from './pages/components/c-table-paciente/c-table-paciente.component';
import { CPacienteComponent } from './pages/components/c-paciente/c-paciente.component';
import { CDetailPacienteComponent } from './pages/components/c-paciente/c-detail-paciente/c-detail-paciente.component';
import { CFormPacienteComponent } from './pages/components/c-paciente/c-form-paciente/c-form-paciente.component';
import { CTableUsuarioComponent } from './pages/components/c-table-usuario/c-table-usuario.component';
import { CFormUsuarioComponent } from './pages/components/c-usuario/c-form-usuario/c-form-usuario.component';
import { CEditUsuarioComponent } from './pages/components/c-usuario/c-edit-usuario/c-edit-usuario.component';
import { CDetailUsuarioComponent } from './pages/components/c-usuario/c-detail-usuario/c-detail-usuario.component';
import { CPerfilUsuarioComponent } from './pages/components/c-usuario/c-perfil-usuario/c-perfil-usuario.component';
import { CPerfilEditUsuarioComponent } from './pages/components/c-usuario/c-perfil-edit-usuario/c-perfil-edit-usuario.component';
import { CDetailEspecialidadComponent } from './pages/components/c-especialidad/c-detail-especialidad/c-detail-especialidad.component';
import { CEditPacienteComponent } from './pages/components/c-paciente/c-edit-paciente/c-edit-paciente.component';
import { CTableMedicoComponent } from './pages/components/c-medico/c-table-medico/c-table-medico.component';
import { CFormMedicoComponent } from './pages/components/c-medico/c-form-medico/c-form-medico.component';
import { CDetailMedicoComponent } from './pages/components/c-medico/c-detail-medico/c-detail-medico.component';
import { CEditMedicoComponent } from './pages/components/c-medico/c-edit-medico/c-edit-medico.component';
import { CTableTurnoComponent } from './pages/components/c-turno/c-table-turno/c-table-turno.component';
import { CFormTurnoComponent } from './pages/components/c-turno/c-form-turno/c-form-turno.component';
import { CDetailTurnoComponent } from './pages/components/c-turno/c-detail-turno/c-detail-turno.component';
import { CEditTurnoComponent } from './pages/components/c-turno/c-edit-turno/c-edit-turno.component';
import { CTablePagoComponent } from './pages/components/c-pago/c-table-pago/c-table-pago.component';
import { CFormPagoComponent } from './pages/components/c-pago/c-form-pago/c-form-pago.component';
import { CDetailPagoComponent } from './pages/components/c-pago/c-detail-pago/c-detail-pago.component';
import { CEditPagoComponent } from './pages/components/c-pago/c-edit-pago/c-edit-pago.component';
import { CPerfilPacienteComponent } from './pages/components/c-paciente/c-perfil-paciente/c-perfil-paciente.component';
import { CPerfilEditPacienteComponent } from './pages/components/c-paciente/c-perfil-edit-paciente/c-perfil-edit-paciente.component';
import { CPerfilMedicoComponent } from './pages/components/c-medico/c-perfil-medico/c-perfil-medico.component';
import { CPerfilEditMedicoComponent } from './pages/components/c-medico/c-perfil-edit-medico/c-perfil-edit-medico.component';

// Importa los datos de localización
registerLocaleData(localeEsAr, 'es-AR'); // Registra los datos para "es-AR"

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
    ProfesionalesComponent,
    CProfesionalComponent,
    CTurnoComponent,
    TurnoComponent,
    TurnoDetailComponent,
    FormEspecialidadComponent,
    CFormEspecialidadComponent,
    EditEspecialidadComponent,
    CEditEspecialidadComponent,
    Pagina404Component,
    CPagina404Component,
    CTableEspecialidadComponent,
    CTableObraSocialComponent,
    CObraSocialComponent,
    CFormObraSocialComponent,
    CEditObraSocialComponent,
    CDetailObraSocialComponent,
    CTableHorarioDeAtencionComponent,
    CHorarioDeAtencionComponent,
    CDetailHorarioDeAtencionComponent,
    CFormHorarioDeAtencionComponent,
    CEditHorarioDeAtencionComponent,
    CTablePacienteComponent,
    CPacienteComponent,
    CDetailPacienteComponent,
    CFormPacienteComponent,
    CTableUsuarioComponent,
    CFormUsuarioComponent,
    CEditUsuarioComponent,
    CDetailUsuarioComponent,
    CPerfilUsuarioComponent,
    CPerfilEditUsuarioComponent,
    CDetailEspecialidadComponent,
    CEditPacienteComponent,
    CTableMedicoComponent,
    CFormMedicoComponent,
    CDetailMedicoComponent,
    CEditMedicoComponent,
    CTableTurnoComponent,
    CFormTurnoComponent,
    CDetailTurnoComponent,
    CEditTurnoComponent,
    CTablePagoComponent,
    CFormPagoComponent,
    CDetailPagoComponent,
    CEditPagoComponent,
    CPerfilPacienteComponent,
    CPerfilEditPacienteComponent,
    CPerfilMedicoComponent,
    CPerfilEditMedicoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ProtegidosModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
    SharedServicesComponent,
    { provide: LOCALE_ID, useValue: 'es-AR' }, // Establece el idioma
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
