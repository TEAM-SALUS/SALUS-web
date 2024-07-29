import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDetailTurnoComponent } from './c-detail-turno.component';

describe('CDetailTurnoComponent', () => {
  let component: CDetailTurnoComponent;
  let fixture: ComponentFixture<CDetailTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDetailTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDetailTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
