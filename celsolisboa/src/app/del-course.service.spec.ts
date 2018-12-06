import { TestBed } from '@angular/core/testing';

import { DelCourseService } from './del-course.service';

describe('DelCourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DelCourseService = TestBed.get(DelCourseService);
    expect(service).toBeTruthy();
  });
});
