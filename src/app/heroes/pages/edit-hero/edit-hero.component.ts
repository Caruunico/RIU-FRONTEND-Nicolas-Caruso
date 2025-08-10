import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormHeroComponent } from '../../components/form-hero/form-hero.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes-service/heroes.service';
import { Hero } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-edit-hero',
  imports: [CommonModule, FormHeroComponent, HeaderComponent],
  standalone: true,
  templateUrl: './edit-hero.component.html',
  styleUrl: './edit-hero.component.scss'
})
export class EditHeroComponent implements OnInit{
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _heroService = inject(HeroesService);
  public heroeSelected: Hero | null = null;

  ngOnInit(): void {
    const heroId = parseInt(this._route.snapshot.params['id']); 
    this.heroeSelected = this._heroService.getHero(heroId)!; 

    if(!this.heroeSelected) this._router.navigate(['/heroes']);
  }
  
  public editHero(hero: Hero) {
    this._heroService.editHero(hero);
    this._router.navigate(['/heroes']);
  }
}
