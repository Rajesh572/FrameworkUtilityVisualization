import { TestBed } from '@angular/core/testing';

import { PublishFrameworkService } from './publish-framework.service';

describe('PublishFrameworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublishFrameworkService = TestBed.get(PublishFrameworkService);
    expect(service).toBeTruthy();
  });
});
