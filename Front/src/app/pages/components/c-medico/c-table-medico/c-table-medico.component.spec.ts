import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTableMedicoComponent } from './c-table-medico.component';

describe('CTableMedicoComponent', () => {
  let component: CTableMedicoComponent;
  let fixture: ComponentFixture<CTableMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTableMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTableMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
