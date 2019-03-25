import { TestBed } from '@angular/core/testing';

import { RequestListenerService } from './request-listener.service';

describe('RequestListenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestListenerService = TestBed.get(RequestListenerService);
    expect(service).toBeTruthy();
  });
});
