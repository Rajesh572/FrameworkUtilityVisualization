import { TestBed } from '@angular/core/testing';

import { CreateUpdateReqService } from './create-update-req.service';

describe('CreateUpdateReqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateUpdateReqService = TestBed.get(CreateUpdateReqService);
    expect(service).toBeTruthy();
  });
});
