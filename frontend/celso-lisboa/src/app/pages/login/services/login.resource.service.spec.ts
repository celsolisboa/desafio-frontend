import { TestBed } from '@angular/core/testing';

import { LoginResourceService } from './login.resource.service';

describe('LoginService', () => {
  let service: LoginResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
