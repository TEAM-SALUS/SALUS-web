import { TestBed } from '@angular/core/testing';

import { ObraSocialService } from './obra-social.service';

describe('ObraSocialService', () => {
  let service: ObraSocialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObraSocialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
