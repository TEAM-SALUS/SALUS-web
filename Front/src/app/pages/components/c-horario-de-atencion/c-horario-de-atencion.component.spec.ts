import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CHorarioDeAtencionComponent } from './c-horario-de-atencion.component';

describe('CHorarioDeAtencionComponent', () => {
  let component: CHorarioDeAtencionComponent;
  let fixture: ComponentFixture<CHorarioDeAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CHorarioDeAtencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CHorarioDeAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
