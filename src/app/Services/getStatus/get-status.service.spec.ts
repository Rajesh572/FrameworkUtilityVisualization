import { TestBed } from '@angular/core/testing';

import { GetStatusService } from './get-status.service';

describe('GetStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetStatusService = TestBed.get(GetStatusService);
    expect(service).toBeTruthy();
  });
});
