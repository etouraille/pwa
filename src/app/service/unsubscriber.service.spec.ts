import { TestBed } from '@angular/core/testing';

import { UnsubscriberService } from './unsubscriber.service';

describe('UnsubscriberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnsubscriberService = TestBed.get(UnsubscriberService);
    expect(service).toBeTruthy();
  });
});
