import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTablePagoComponent } from './c-table-pago.component';

describe('CTablePagoComponent', () => {
  let component: CTablePagoComponent;
  let fixture: ComponentFixture<CTablePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTablePagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTablePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
