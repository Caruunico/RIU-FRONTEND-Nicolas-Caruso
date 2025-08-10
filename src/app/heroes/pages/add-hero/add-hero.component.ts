import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { FormHeroComponent } from '../../components/form-hero/form-hero.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Hero } from '../../interfaces/heroe.interface';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes-service/heroes.service';

@Component({
  selector: 'app-add-hero',
  imports: [CommonModule, FormHeroComponent, HeaderComponent],
  standalone: true,
  templateUrl: './add-hero.component.html',
  styleUrl: './add-hero.component.scss'
})
export class AddHeroComponent {
  private _router = inject(Router);
  private _heroService = inject(HeroesService);

  public addHero(hero: Hero) {
    this._heroService.addHero(hero);
    this._router.navigate(['/heroes']);
  }
}
