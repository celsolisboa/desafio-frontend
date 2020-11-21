import { TestBed } from '@angular/core/testing';

import { Home.ResourceService } from './home.resource.service';

describe('Home.ResourceService', () => {
  let service: Home.ResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Home.ResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
