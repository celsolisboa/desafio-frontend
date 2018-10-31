import { TestBed } from '@angular/core/testing';

import { SearchListService } from './search-list.service';

describe('SearchListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchListService = TestBed.get(SearchListService);
    expect(service).toBeTruthy();
  });
});
