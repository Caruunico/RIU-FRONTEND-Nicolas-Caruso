import { fakeAsync, tick } from '@angular/core/testing';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { loadingInterceptor } from './loading-interceptor.service';
import { LoadingService } from '../../shared/services/loading/loading.service';
import { inject } from '@angular/core';

jest.mock('@angular/core', () => ({
  ...jest.requireActual('@angular/core'),
  inject: jest.fn(),
}));

describe('loadingInterceptor', () => {
  let loadingServiceMock: { show: jest.Mock; hide: jest.Mock };
  let httpHandlerMock: HttpHandler;

  beforeEach(() => {
    jest.useFakeTimers();

    loadingServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
    };

    (inject as jest.Mock).mockImplementation((token) => {
      if (token === LoadingService) return loadingServiceMock;
      throw new Error('Unexpected injection token: ' + token);
    });

    httpHandlerMock = {
      handle: jest.fn().mockReturnValue(of({})),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should call show on LoadingService and then hide after finalize delay', fakeAsync(() => {
    const req = new HttpRequest('GET', '/test');

    const result$ = loadingInterceptor(req, httpHandlerMock.handle.bind(httpHandlerMock));

    result$.subscribe();

    expect(loadingServiceMock.show).toHaveBeenCalledTimes(1);
    expect(httpHandlerMock.handle).toHaveBeenCalledWith(req);

    tick(3000);

    expect(loadingServiceMock.hide).toHaveBeenCalledTimes(1);
  }));
});
