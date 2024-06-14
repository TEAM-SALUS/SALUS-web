import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPagina404Component } from './c-pagina404.component';

describe('CPagina404Component', () => {
  let component: CPagina404Component;
  let fixture: ComponentFixture<CPagina404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPagina404Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPagina404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
