import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDetalleEspecialidadComponent } from './c-detalle-especialidad.component';

describe('CDetalleEspecialidadComponent', () => {
  let component: CDetalleEspecialidadComponent;
  let fixture: ComponentFixture<CDetalleEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDetalleEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDetalleEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
