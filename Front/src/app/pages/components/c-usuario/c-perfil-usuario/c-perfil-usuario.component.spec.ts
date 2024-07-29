import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPerfilUsuarioComponent } from './c-perfil-usuario.component';

describe('CPerfilUsuarioComponent', () => {
  let component: CPerfilUsuarioComponent;
  let fixture: ComponentFixture<CPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPerfilUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
