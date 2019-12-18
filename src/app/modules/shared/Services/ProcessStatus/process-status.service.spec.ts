import { TestBed } from '@angular/core/testing';

import { ProcessStatusService } from './process-status.service';

describe('ProcessStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessStatusService = TestBed.get(ProcessStatusService);
    expect(service).toBeTruthy();
  });
});
