import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalesComponent } from './profesionales.component';

describe('ProfesionalesComponent', () => {
  let component: ProfesionalesComponent;
  let fixture: ComponentFixture<ProfesionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesionalesComponent]
    });
    fixture = TestBed.createComponent(ProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
