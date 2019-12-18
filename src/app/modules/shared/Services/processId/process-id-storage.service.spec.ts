import { TestBed } from '@angular/core/testing';

import { ProcessIdStorageService } from './process-id-storage.service';

describe('ProcessIdStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessIdStorageService = TestBed.get(ProcessIdStorageService);
    expect(service).toBeTruthy();
  });
});
