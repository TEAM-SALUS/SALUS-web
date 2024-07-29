import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFormPacienteComponent } from './c-form-paciente.component';

describe('CFormPacienteComponent', () => {
  let component: CFormPacienteComponent;
  let fixture: ComponentFixture<CFormPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFormPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFormPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
