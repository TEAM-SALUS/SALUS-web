import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoDetailComponent } from './medico-detail.component';

describe('MedicoDetailComponent', () => {
  let component: MedicoDetailComponent;
  let fixture: ComponentFixture<MedicoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
