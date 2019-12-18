import { TestBed } from '@angular/core/testing';

import { LiveTermsService } from './live-terms.service';

describe('LiveTermsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveTermsService = TestBed.get(LiveTermsService);
    expect(service).toBeTruthy();
  });
});
