import { TestBed } from '@angular/core/testing';

import { DownloadExcelService } from './download-excel.service';

describe('DownloadExcelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadExcelService = TestBed.get(DownloadExcelService);
    expect(service).toBeTruthy();
  });
});
