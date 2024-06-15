import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CProfesionalComponent } from './c-profesionales.component';

describe('CProfesionalesComponent', () => {
  let component: CProfesionalComponent;
  let fixture: ComponentFixture<CProfesionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CProfesionalComponent]
    });
    fixture = TestBed.createComponent(CProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
