import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoDetailComponent } from './turno-detail.component';

describe('TurnoDetailComponent', () => {
  let component: TurnoDetailComponent;
  let fixture: ComponentFixture<TurnoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
