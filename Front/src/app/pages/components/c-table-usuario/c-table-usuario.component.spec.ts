import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTableUsuarioComponent } from './c-table-usuario.component';

describe('CTableUsuarioComponent', () => {
  let component: CTableUsuarioComponent;
  let fixture: ComponentFixture<CTableUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTableUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTableUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
