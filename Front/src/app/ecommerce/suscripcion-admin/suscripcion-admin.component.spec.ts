import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionAdminComponent } from './suscripcion-admin.component';

describe('SuscripcionAdminComponent', () => {
  let component: SuscripcionAdminComponent;
  let fixture: ComponentFixture<SuscripcionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuscripcionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscripcionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
