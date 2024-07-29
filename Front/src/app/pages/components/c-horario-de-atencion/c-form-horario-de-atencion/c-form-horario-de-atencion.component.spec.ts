import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFormHorarioDeAtencionComponent } from './c-form-horario-de-atencion.component';

describe('CFormHorarioDeAtencionComponent', () => {
  let component: CFormHorarioDeAtencionComponent;
  let fixture: ComponentFixture<CFormHorarioDeAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFormHorarioDeAtencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFormHorarioDeAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
