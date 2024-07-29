import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTableObraSocialComponent } from './c-table-obra-social.component';

describe('CTableObraSocialComponent', () => {
  let component: CTableObraSocialComponent;
  let fixture: ComponentFixture<CTableObraSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTableObraSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTableObraSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
