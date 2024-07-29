import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPerfilPacienteComponent } from './c-perfil-paciente.component';

describe('CPerfilPacienteComponent', () => {
  let component: CPerfilPacienteComponent;
  let fixture: ComponentFixture<CPerfilPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPerfilPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPerfilPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
