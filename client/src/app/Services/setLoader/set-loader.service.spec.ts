import { TestBed } from '@angular/core/testing';

import { SetLoaderService } from './set-loader.service';

describe('SetLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetLoaderService = TestBed.get(SetLoaderService);
    expect(service).toBeTruthy();
  });
});
