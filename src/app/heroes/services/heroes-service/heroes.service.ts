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

  public addHero(hero: Hero) {
    this.heroes.update(current => {
      const lastId = current.length > 0 ? Math.max(...current.map(h => h.id ?? 0)) : 0;
      const newHero = { ...hero, id: lastId + 1 };
      return [...current, newHero];
    });

    console.log(this.heroes())
  }

}
