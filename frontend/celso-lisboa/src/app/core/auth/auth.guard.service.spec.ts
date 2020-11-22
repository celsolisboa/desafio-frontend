import { TestBed } from '@angular/core/testing';

import { Auth.GuardService } from './auth.guard.service';

describe('Auth.GuardService', () => {
  let service: Auth.GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth.GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
