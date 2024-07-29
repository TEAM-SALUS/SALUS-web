import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDetailEspecialidadComponent } from './c-detail-especialidad.component';

describe('CDetailEspecialidadComponent', () => {
  let component: CDetailEspecialidadComponent;
  let fixture: ComponentFixture<CDetailEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDetailEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDetailEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
