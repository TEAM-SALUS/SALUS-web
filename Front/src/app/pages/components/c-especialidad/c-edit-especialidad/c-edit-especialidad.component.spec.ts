import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditEspecialidadComponent } from './c-edit-especialidad.component';

describe('CEditEspecialidadComponent', () => {
  let component: CEditEspecialidadComponent;
  let fixture: ComponentFixture<CEditEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEditEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEditEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
