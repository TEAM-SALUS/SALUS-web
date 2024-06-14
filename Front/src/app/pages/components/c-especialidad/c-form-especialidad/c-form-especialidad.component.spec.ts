import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFormEspecialidadComponent } from './c-form-especialidad.component';

describe('CFormEspecialidadComponent', () => {
  let component: CFormEspecialidadComponent;
  let fixture: ComponentFixture<CFormEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFormEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFormEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
