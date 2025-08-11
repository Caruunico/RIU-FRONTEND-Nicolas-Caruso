import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoadingService } from './shared/services/loading/loading.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const loadingServiceMock = {
    loading$: of(true)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        { provide: LoadingService, useValue: loadingServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener loading$ definido y ser igual al observable del servicio', () => {
    let loadingValue: boolean | undefined;
    component.loading$.subscribe(value => {
      loadingValue = value;
    });
    expect(loadingValue).toBe(true);
  });

  it('debería tener el título correcto', () => {
    expect(component.title).toBe('RIU-Frontend-Nicolas-Caruso');
  });
});
