import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDetailPagoComponent } from './c-detail-pago.component';

describe('CDetailPagoComponent', () => {
  let component: CDetailPagoComponent;
  let fixture: ComponentFixture<CDetailPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDetailPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDetailPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
