import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDetailMedicoComponent } from './c-detail-medico.component';

describe('CDetailMedicoComponent', () => {
  let component: CDetailMedicoComponent;
  let fixture: ComponentFixture<CDetailMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDetailMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDetailMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
