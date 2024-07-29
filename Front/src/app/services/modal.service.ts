import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IObraSocial } from '../model/i-obra-social';
import { HorarioAtencionInterface } from '../model/horarios-atencion';
import { IPaciente } from '../model/i-paciente';
import { IUsuario } from '../model/i-usuario';
import { EspecialidadInterface } from '../model/especialidad';
import { IMedico } from '../model/i-medico';
import { ITurno } from '../model/iturno';
import { IPago } from '../model/i-pago';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  /* Usuario */
  public usuarioEditar: BehaviorSubject<IUsuario> =
    new BehaviorSubject<IUsuario>({});
  public usuarioDetalle: BehaviorSubject<IUsuario> =
    new BehaviorSubject<IUsuario>({});
  public usuarioPerfilEditar: BehaviorSubject<IUsuario> =
    new BehaviorSubject<IUsuario>({});
  /* ObraSocial */
  public obraSocialEditar: BehaviorSubject<IObraSocial> =
    new BehaviorSubject<IObraSocial>({});
  public obraSocialDetalle: BehaviorSubject<IObraSocial> =
    new BehaviorSubject<IObraSocial>({});
  /* Paciente */
  public pacienteEditar: BehaviorSubject<IPaciente> =
    new BehaviorSubject<IPaciente>({});
  public pacienteDetalle: BehaviorSubject<IPaciente> =
    new BehaviorSubject<IPaciente>({});
  public pacientePerfilEditar: BehaviorSubject<IPaciente> =
    new BehaviorSubject<IPaciente>({});
  /* Especialidad */
  public especialidadDetalle: BehaviorSubject<EspecialidadInterface> =
    new BehaviorSubject<EspecialidadInterface>({});
  /* HorarioDeAtencion */
  public horarioDeAtencionEditar: BehaviorSubject<HorarioAtencionInterface> =
    new BehaviorSubject<HorarioAtencionInterface>({});
  public horarioDeAtencionDetalle: BehaviorSubject<HorarioAtencionInterface> =
    new BehaviorSubject<HorarioAtencionInterface>({});
  /* Medico */
  public medicoEditar: BehaviorSubject<IMedico> = new BehaviorSubject<IMedico>(
    {}
  );
  public medicoDetalle: BehaviorSubject<IMedico> = new BehaviorSubject<IMedico>(
    {}
  );
  public medicoPerfilEditar: BehaviorSubject<IMedico> = new BehaviorSubject<IMedico>(
    {}
  );
  /* Turno */
  public turnoEditar: BehaviorSubject<ITurno> = new BehaviorSubject<ITurno>({});
  public turnoDetalle: BehaviorSubject<ITurno> = new BehaviorSubject<ITurno>(
    {}
  );
  /* Pago */
  public pagoEditar: BehaviorSubject<IPago> = new BehaviorSubject<IPago>({});
  public pagoDetalle: BehaviorSubject<IPago> = new BehaviorSubject<IPago>({});

  constructor() {}
}
