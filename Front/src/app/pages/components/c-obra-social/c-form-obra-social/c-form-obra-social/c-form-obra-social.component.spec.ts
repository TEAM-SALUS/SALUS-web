import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFormObraSocialComponent } from './c-form-obra-social.component';

describe('CFormObraSocialComponent', () => {
  let component: CFormObraSocialComponent;
  let fixture: ComponentFixture<CFormObraSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CFormObraSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFormObraSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
