import { computed, Injectable, signal } from '@angular/core';
import { Hero } from '../../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  public heroes = signal<Hero[]>([]);
  public selectedHero = signal<Hero | null>(null);
  public filterTerm = signal('');
  public filteredHeroes = computed(() => {
    const term = this.filterTerm().trim().toLowerCase();
    if (!term) return this.heroes();
    return this.heroes().filter(hero =>
      hero.name.toLowerCase().includes(term)
    );
  });

  constructor() { }

  public setHeroes(heroes: Hero[]) {
    this.heroes.set(heroes);
  }

  public setFilterTerm(term: string) {
    this.filterTerm.set(term);
  }



}
