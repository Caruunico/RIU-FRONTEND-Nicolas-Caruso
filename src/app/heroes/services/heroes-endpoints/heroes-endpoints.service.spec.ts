import { TestBed } from '@angular/core/testing';

import { HeroesEndpointsService } from './heroes-endpoints.service';

describe('HeroesEndpointsService', () => {
  let service: HeroesEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
