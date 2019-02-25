import { TestBed } from '@angular/core/testing';

import { FactorService } from './factor.service';

describe('FactorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactorService = TestBed.get(FactorService);
    expect(service).toBeTruthy();
  });
});
