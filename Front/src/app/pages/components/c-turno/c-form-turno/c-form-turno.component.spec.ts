import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFormTurnoComponent } from './c-form-turno.component';

describe('CFormTurnoComponent', () => {
  let component: CFormTurnoComponent;
  let fixture: ComponentFixture<CFormTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFormTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFormTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
