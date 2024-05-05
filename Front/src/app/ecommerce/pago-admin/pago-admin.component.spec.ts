import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoAdminComponent } from './pago-admin.component';

describe('PagoAdminComponent', () => {
  let component: PagoAdminComponent;
  let fixture: ComponentFixture<PagoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
