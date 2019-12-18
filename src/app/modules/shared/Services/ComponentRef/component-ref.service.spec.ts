import { TestBed } from '@angular/core/testing';

import { ComponentRefService } from './component-ref.service';

describe('ComponentRefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentRefService = TestBed.get(ComponentRefService);
    expect(service).toBeTruthy();
  });
});
