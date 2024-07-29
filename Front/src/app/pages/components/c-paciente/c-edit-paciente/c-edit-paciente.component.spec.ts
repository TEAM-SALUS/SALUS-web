import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditPacienteComponent } from './c-edit-paciente.component';

describe('CEditPacienteComponent', () => {
  let component: CEditPacienteComponent;
  let fixture: ComponentFixture<CEditPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEditPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEditPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
