import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEspecialidadComponent } from './detalle-especialidad.component';

describe('DetalleEspecialidadComponent', () => {
  let component: DetalleEspecialidadComponent;
  let fixture: ComponentFixture<DetalleEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
