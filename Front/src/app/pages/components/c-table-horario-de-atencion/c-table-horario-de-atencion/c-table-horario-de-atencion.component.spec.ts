import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTableHorarioDeAtencionComponent } from './c-table-horario-de-atencion.component';

describe('CTableHorarioDeAtencionComponent', () => {
  let component: CTableHorarioDeAtencionComponent;
  let fixture: ComponentFixture<CTableHorarioDeAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTableHorarioDeAtencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTableHorarioDeAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
