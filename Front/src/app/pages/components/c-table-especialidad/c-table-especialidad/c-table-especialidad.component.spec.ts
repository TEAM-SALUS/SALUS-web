import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTableEspecialidadComponent } from './c-table-especialidad.component';

describe('CTableEspecialidadComponent', () => {
  let component: CTableEspecialidadComponent;
  let fixture: ComponentFixture<CTableEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTableEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTableEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
