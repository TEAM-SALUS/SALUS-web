import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CConsultaComponent } from './c-consulta.component';

describe('CConsultaComponent', () => {
  let component: CConsultaComponent;
  let fixture: ComponentFixture<CConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
