import { TestBed } from '@angular/core/testing';

import { FWTermsReadService } from './fwterms-read.service';

describe('FWTermsReadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FWTermsReadService = TestBed.get(FWTermsReadService);
    expect(service).toBeTruthy();
  });
});
