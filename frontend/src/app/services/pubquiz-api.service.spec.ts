import { TestBed } from '@angular/core/testing';

import { PubquizApiService } from './pubquiz-api.service';

describe('PubquizApiService', () => {
  let service: PubquizApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubquizApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
