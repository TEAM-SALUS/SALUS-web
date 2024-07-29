import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDetailHorarioDeAtencionComponent } from './c-detail-horario-de-atencion.component';

describe('CDetailHorarioDeAtencionComponent', () => {
  let component: CDetailHorarioDeAtencionComponent;
  let fixture: ComponentFixture<CDetailHorarioDeAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDetailHorarioDeAtencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDetailHorarioDeAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
