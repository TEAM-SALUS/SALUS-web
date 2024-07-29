import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditTurnoComponent } from './c-edit-turno.component';

describe('CEditTurnoComponent', () => {
  let component: CEditTurnoComponent;
  let fixture: ComponentFixture<CEditTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEditTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEditTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
