import { TestBed } from '@angular/core/testing';

import { Course.FacadeService } from './course.facade.service';

describe('Course.FacadeService', () => {
  let service: Course.FacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Course.FacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
