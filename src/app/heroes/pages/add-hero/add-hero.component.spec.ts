import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHeroComponent } from './add-hero.component';
import { HeroesService } from '../../services/heroes-service/heroes.service';
import { Router } from '@angular/router';

const mockHero = { id: 1, name: 'Hero 1', description: 'Desc 1', image: '' };

describe('AddHeroComponent (Jest)', () => {
  let component: AddHeroComponent;
  let fixture: ComponentFixture<AddHeroComponent>;

  const heroesServiceMock = {
    addHero: jest.fn(),
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeroComponent],
      providers: [
        { provide: HeroesService, useValue: heroesServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('addHero debería llamar al servicio y navegar a /heroes', () => {
    component.addHero(mockHero);

    expect(heroesServiceMock.addHero).toHaveBeenCalledWith(mockHero);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/heroes']);
  });
});
