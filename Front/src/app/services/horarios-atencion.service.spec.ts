import { TestBed } from '@angular/core/testing';

import { HorariosAtencionService } from './horarios-atencion.service';

describe('HorariosAtencionService', () => {
  let service: HorariosAtencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariosAtencionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
