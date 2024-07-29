import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPerfilEditUsuarioComponent } from './c-perfil-edit-usuario.component';

describe('CPerfilEditUsuarioComponent', () => {
  let component: CPerfilEditUsuarioComponent;
  let fixture: ComponentFixture<CPerfilEditUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPerfilEditUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPerfilEditUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
