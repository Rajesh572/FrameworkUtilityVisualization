import { TestBed } from '@angular/core/testing';

import { SetDefaultService } from './set-default.service';

describe('SetDefaultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetDefaultService = TestBed.get(SetDefaultService);
    expect(service).toBeTruthy();
  });
});
