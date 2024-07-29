import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFormMedicoComponent } from './c-form-medico.component';

describe('CFormMedicoComponent', () => {
  let component: CFormMedicoComponent;
  let fixture: ComponentFixture<CFormMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFormMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFormMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
