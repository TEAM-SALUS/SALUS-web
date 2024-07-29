import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPerfilMedicoComponent } from './c-perfil-medico.component';

describe('CPerfilMedicoComponent', () => {
  let component: CPerfilMedicoComponent;
  let fixture: ComponentFixture<CPerfilMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPerfilMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPerfilMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
