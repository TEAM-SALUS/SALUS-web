import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditUsuarioComponent } from './c-edit-usuario.component';

describe('CEditUsuarioComponent', () => {
  let component: CEditUsuarioComponent;
  let fixture: ComponentFixture<CEditUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEditUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEditUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
