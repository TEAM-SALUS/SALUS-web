import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFormUsuarioComponent } from './c-form-usuario.component';

describe('CFormUsuarioComponent', () => {
  let component: CFormUsuarioComponent;
  let fixture: ComponentFixture<CFormUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFormUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
