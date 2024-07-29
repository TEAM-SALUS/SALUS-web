import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPerfilEditPacienteComponent } from './c-perfil-edit-paciente.component';

describe('CPerfilEditPacienteComponent', () => {
  let component: CPerfilEditPacienteComponent;
  let fixture: ComponentFixture<CPerfilEditPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPerfilEditPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPerfilEditPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
