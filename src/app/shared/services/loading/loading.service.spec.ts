import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { take } from 'rxjs/operators';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should emit true when show() is called', (done) => {
    service.loading$.pipe(take(1)).subscribe(value => {
      expect(value).toBe(false);
    });

    service.show();

    service.loading$.pipe(take(1)).subscribe(value => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should emit false when hide() is called', (done) => {
    service.show();

    service.loading$.pipe(take(1)).subscribe(value => {
      expect(value).toBe(true);
    });

    service.hide();

    service.loading$.pipe(take(1)).subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });
});
