import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditHorarioDeAtencionComponent } from './c-edit-horario-de-atencion.component';

describe('CEditHorarioDeAtencionComponent', () => {
  let component: CEditHorarioDeAtencionComponent;
  let fixture: ComponentFixture<CEditHorarioDeAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEditHorarioDeAtencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEditHorarioDeAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
