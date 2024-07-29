import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDetailObraSocialComponent } from './c-detail-obra-social.component';

describe('CDetailObraSocialComponent', () => {
  let component: CDetailObraSocialComponent;
  let fixture: ComponentFixture<CDetailObraSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDetailObraSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDetailObraSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
