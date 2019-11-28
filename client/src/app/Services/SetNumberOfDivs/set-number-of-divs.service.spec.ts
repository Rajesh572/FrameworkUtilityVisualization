import { TestBed } from '@angular/core/testing';

import { SetNumberOfDivsService } from './set-number-of-divs.service';

describe('SetNumberOfDivsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetNumberOfDivsService = TestBed.get(SetNumberOfDivsService);
    expect(service).toBeTruthy();
  });
});
