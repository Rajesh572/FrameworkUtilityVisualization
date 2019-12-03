import { TestBed } from '@angular/core/testing';

import { FWCatgReadService } from './fwcatg-read.service';

describe('FWCatgReadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FWCatgReadService = TestBed.get(FWCatgReadService);
    expect(service).toBeTruthy();
  });
});
