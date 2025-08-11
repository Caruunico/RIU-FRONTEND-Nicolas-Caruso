import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroeslistComponent } from './heroeslist.component';
import { HeroesService } from '../../services/heroes-service/heroes.service';
import { HeroesEndpointsService } from '../../services/heroes-endpoints/heroes-endpoints.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

const mockHeroes = [
  { id: 1, name: 'Hero 1', description: 'Desc 1', image: '' },
  { id: 2, name: 'Hero 2', description: 'Desc 2', image: '' },
];

describe('HeroeslistComponent (Jest)', () => {
  let component: HeroeslistComponent;
  let fixture: ComponentFixture<HeroeslistComponent>;

  const heroesServiceMock = {
    heroes: jest.fn().mockReturnValue(mockHeroes),
    setHeroes: jest.fn(),
    deleteHero: jest.fn(),
  };

  const heroesEndpointsServiceMock = {
    getHeroes: jest.fn().mockReturnValue(of(mockHeroes)),
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  const modalRefMock = {
    componentInstance: {},
    result: Promise.resolve(true),
  };

  const modalServiceMock = {
    open: jest.fn().mockReturnValue(modalRefMock),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroeslistComponent, NgbModalModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: HeroesService, useValue: heroesServiceMock },
        { provide: HeroesEndpointsService, useValue: heroesEndpointsServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: NgbModal, useValue: modalServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería navegar a add-hero', () => {
    component.goToAddHero();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/add-hero']);
  });

  it('debería navegar a editar héroe', () => {
    component.goToEditHero(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/edit-hero/1']);
  });

  it('debería filtrar héroes', () => {
    component.dataSource.data = mockHeroes;
    component.searchHero('hero 1');
    expect(component.lengthHeroes).toBe(1);
  });
});
