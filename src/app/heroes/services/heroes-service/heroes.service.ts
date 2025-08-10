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

}
