import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDetailUsuarioComponent } from './c-detail-usuario.component';

describe('CDetailUsuarioComponent', () => {
  let component: CDetailUsuarioComponent;
  let fixture: ComponentFixture<CDetailUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDetailUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDetailUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
