import { TestBed } from '@angular/core/testing';

import { FWreadService } from './fwread.service';

describe('FWreadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FWreadService = TestBed.get(FWreadService);
    expect(service).toBeTruthy();
  });
});
