import { TestBed, flushMicrotasks, fakeAsync } from '@angular/core/testing';

import { ResponsiveService } from './responsive.service';
import { ResponsiveEnum } from './responsive.enum';

describe('ResponsiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({})
  });

  it('should be created', () => {
    const service: ResponsiveService = TestBed.get(ResponsiveService);
    expect(service).toBeTruthy();
  });
});
