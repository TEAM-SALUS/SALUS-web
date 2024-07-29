import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDetailPacienteComponent } from './c-detail-paciente.component';

describe('CDetailPacienteComponent', () => {
  let component: CDetailPacienteComponent;
  let fixture: ComponentFixture<CDetailPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDetailPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDetailPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
