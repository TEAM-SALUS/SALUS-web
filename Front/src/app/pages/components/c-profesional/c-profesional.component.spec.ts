import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CProfesionalComponent } from './c-profesional.component';

describe('CProfesionalComponent', () => {
  let component: CProfesionalComponent;
  let fixture: ComponentFixture<CProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CProfesionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
