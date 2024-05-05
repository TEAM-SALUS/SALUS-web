import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDoctorComponent } from './form-doctor.component';

describe('FormDoctorComponent', () => {
  let component: FormDoctorComponent;
  let fixture: ComponentFixture<FormDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
