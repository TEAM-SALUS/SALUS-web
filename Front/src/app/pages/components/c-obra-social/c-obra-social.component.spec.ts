import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CObraSocialComponent } from './c-obra-social.component';

describe('CObraSocialComponent', () => {
  let component: CObraSocialComponent;
  let fixture: ComponentFixture<CObraSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CObraSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CObraSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
