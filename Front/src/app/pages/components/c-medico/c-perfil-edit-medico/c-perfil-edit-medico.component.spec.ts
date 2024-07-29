import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPerfilEditMedicoComponent } from './c-perfil-edit-medico.component';

describe('CPerfilEditMedicoComponent', () => {
  let component: CPerfilEditMedicoComponent;
  let fixture: ComponentFixture<CPerfilEditMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPerfilEditMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPerfilEditMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
