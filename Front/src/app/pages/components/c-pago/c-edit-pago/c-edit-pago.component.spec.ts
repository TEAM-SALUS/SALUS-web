import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditPagoComponent } from './c-edit-pago.component';

describe('CEditPagoComponent', () => {
  let component: CEditPagoComponent;
  let fixture: ComponentFixture<CEditPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEditPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEditPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
