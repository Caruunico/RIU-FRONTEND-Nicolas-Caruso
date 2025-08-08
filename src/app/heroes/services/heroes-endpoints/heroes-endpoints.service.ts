import { inject } from '@angular/core';
import { Hero } from '../../interfaces/heroe.interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

export class HeroesEndpointsService {
  private apiUrl = 'assets/heroes/heroes.json';
  private heroesCache!: Hero[];
  private http = inject(HttpClient);

  getHeroes(): Observable<Hero[]> {
    if (this.heroesCache) {
      return of(this.heroesCache);
    }

    return this.http.get<{ superheroes: Hero[] }>(this.apiUrl).pipe(
      map((response) => {
        this.heroesCache = response.superheroes;
        return this.heroesCache;
      })
    );
  }

}
