import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFormPagoComponent } from './c-form-pago.component';

describe('CFormPagoComponent', () => {
  let component: CFormPagoComponent;
  let fixture: ComponentFixture<CFormPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFormPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFormPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
