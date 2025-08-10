import { computed, Injectable, signal } from '@angular/core';
import { Hero } from '../../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  public heroes = signal<Hero[]>([]);
  public selectedHero = signal<Hero | null>(null);

  constructor() { }

  public setHeroes(heroes: Hero[]) {
    this.heroes.set(heroes);
  }

  public getHero(id: number) {
    return this.heroes().find(hero => hero.id == id);
  }

  public addHero(hero: Hero) {
    this.heroes.update(current => {
      const lastId = current.length > 0 ? Math.max(...current.map(h => h.id ?? 0)) : 0;
      const newHero = { ...hero, id: lastId + 1 };
      return [...current, newHero];
    });
  }

  public editHero(updatedHero: Hero) {
    this.heroes.update(current => {
      return current.map(hero => hero.id === updatedHero.id ? updatedHero : hero);
    });
  }

  public deleteHero(id: number) {
    this.heroes.update(current => current.filter(hero => hero.id !== id));
  }

}
