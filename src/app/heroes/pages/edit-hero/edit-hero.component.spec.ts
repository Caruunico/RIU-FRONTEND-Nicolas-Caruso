import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditHeroComponent } from './edit-hero.component';
import { HeroesService } from '../../services/heroes-service/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

const mockHero = { id: 1, name: 'Hero 1', description: 'Desc 1', image: '' };

describe('EditHeroComponent (Jest)', () => {
  let component: EditHeroComponent;
  let fixture: ComponentFixture<EditHeroComponent>;

  const heroesServiceMock = {
    getHero: jest.fn().mockReturnValue(mockHero),
    editHero: jest.fn(),
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  const activatedRouteMock = {
    snapshot: {
      params: { id: '1' }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeroComponent],
      providers: [
        { provide: HeroesService, useValue: heroesServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debería cargar heroe y asignarlo a heroeSelected', () => {
    component.ngOnInit();
    expect(heroesServiceMock.getHero).toHaveBeenCalledWith(1);
    expect(component.heroeSelected).toEqual(mockHero);
  });

  it('ngOnInit debería redirigir si no se encuentra el héroe', () => {
    heroesServiceMock.getHero.mockReturnValueOnce(null);
    component.ngOnInit();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('editHero debería llamar a editHero del servicio y navegar a /heroes', () => {
    component.editHero(mockHero);
    expect(heroesServiceMock.editHero).toHaveBeenCalledWith(mockHero);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  });
});
