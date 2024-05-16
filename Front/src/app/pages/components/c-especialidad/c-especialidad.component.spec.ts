import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEspecialidadComponent } from './c-especialidad.component';

describe('CEspecialidadComponent', () => {
  let component: CEspecialidadComponent;
  let fixture: ComponentFixture<CEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
