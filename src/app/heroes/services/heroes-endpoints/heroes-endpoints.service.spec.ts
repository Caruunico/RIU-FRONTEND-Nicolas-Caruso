import { TestBed } from '@angular/core/testing';
import { HeroesEndpointsService } from './heroes-endpoints.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('HeroesEndpointsService', () => {
  let service: HeroesEndpointsService;
  let httpMock: HttpTestingController;

  const mockResponse = {
    superheroes: [
      { id: 1, name: 'Hero 1', description: 'desc 1', image: '' },
      { id: 2, name: 'Hero 2', description: 'desc 2', image: '' },
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting(),HeroesEndpointsService]
    });

    service = TestBed.inject(HeroesEndpointsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver heroes cacheados si existen', (done) => {
    (service as any).heroesCache = mockResponse.superheroes;

    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(mockResponse.superheroes);
      done();
    });
  });

  it('debería llamar HttpClient y mapear respuesta si no hay cache', (done) => {
    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(mockResponse.superheroes);
      done();
    });

    const req = httpMock.expectOne('assets/heroes/heroes.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

});
