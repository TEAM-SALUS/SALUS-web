import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditMedicoComponent } from './c-edit-medico.component';

describe('CEditMedicoComponent', () => {
  let component: CEditMedicoComponent;
  let fixture: ComponentFixture<CEditMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEditMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEditMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
