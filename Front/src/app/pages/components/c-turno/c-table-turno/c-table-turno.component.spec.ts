import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTableTurnoComponent } from './c-table-turno.component';

describe('CTableTurnoComponent', () => {
  let component: CTableTurnoComponent;
  let fixture: ComponentFixture<CTableTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTableTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTableTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
