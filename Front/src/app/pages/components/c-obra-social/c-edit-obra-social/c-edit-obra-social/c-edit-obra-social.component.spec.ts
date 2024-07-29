import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditObraSocialComponent } from './c-edit-obra-social.component';

describe('CEditObraSocialComponent', () => {
  let component: CEditObraSocialComponent;
  let fixture: ComponentFixture<CEditObraSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CEditObraSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEditObraSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
