import { TestBed } from '@angular/core/testing';

import { CourseResourceService } from './course.resource.service';

describe('CourseService', () => {
  let service: CourseResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});