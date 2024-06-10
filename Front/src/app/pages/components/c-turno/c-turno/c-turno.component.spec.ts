import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTurnoComponent } from './c-turno.component';

describe('CTurnoComponent', () => {
  let component: CTurnoComponent;
  let fixture: ComponentFixture<CTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
