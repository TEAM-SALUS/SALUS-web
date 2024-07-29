import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTablePacienteComponent } from './c-table-paciente.component';

describe('CTablePacienteComponent', () => {
  let component: CTablePacienteComponent;
  let fixture: ComponentFixture<CTablePacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTablePacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTablePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
