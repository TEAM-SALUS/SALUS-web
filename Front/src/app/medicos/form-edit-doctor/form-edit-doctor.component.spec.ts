import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditDoctorComponent } from './form-edit-doctor.component';

describe('FormEditDoctorComponent', () => {
  let component: FormEditDoctorComponent;
  let fixture: ComponentFixture<FormEditDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
