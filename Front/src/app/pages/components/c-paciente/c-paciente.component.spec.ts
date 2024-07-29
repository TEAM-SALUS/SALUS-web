import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPacienteComponent } from './c-paciente.component';

describe('CPacienteComponent', () => {
  let component: CPacienteComponent;
  let fixture: ComponentFixture<CPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
