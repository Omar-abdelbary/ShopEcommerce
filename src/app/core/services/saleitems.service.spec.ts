import { TestBed } from '@angular/core/testing';

import { SaleitemsService } from './saleitems.service';

describe('SaleitemsService', () => {
  let service: SaleitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
