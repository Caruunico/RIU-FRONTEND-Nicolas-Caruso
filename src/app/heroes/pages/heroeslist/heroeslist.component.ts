import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HeroesEndpointsService } from '../../services/heroes-endpoints/heroes-endpoints.service';
import { Hero } from '../../interfaces/heroe.interface';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { HeroesService } from '../../services/heroes-service/heroes.service';
import { take } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-heroeslist',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, HeaderComponent, RouterModule, MatButtonModule],
  providers: [HeroesEndpointsService],
  templateUrl: './heroeslist.component.html',
  styleUrl: './heroeslist.component.scss'
})
export class HeroeslistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _heroEndpointsService = inject(HeroesEndpointsService);
  private _heroService = inject(HeroesService);
  private _router = inject(Router);

  public displayedColumns: string[] = ['image', 'name', 'description'];
  public dataSource = new MatTableDataSource<Hero>([]);

  public heroes: Hero[] = [];
  public totalPages: number = 1;
  public heroesPerPage = 5;
  public lengthHeroes: number = 0;

  constructor() {
    effect(() => {
      const heroes = this._heroService.heroes();
      this.dataSource = new MatTableDataSource(heroes);
      this.lengthHeroes = this.dataSource.filteredData.length;
    });
  }

  ngOnInit(): void {
    this.loadHeroes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public loadHeroes(): void {
    if (this._heroService.heroes().length > 0) {
      this.heroes = this._heroService.heroes();
      this._heroService.setHeroes(this.heroes);
      return;
    }

    this._heroEndpointsService.getHeroes().pipe(take(1)).subscribe({
      next: (heroes: Hero[]) => {
        this.heroes = heroes;
        this._heroService.setHeroes(heroes);
      },
      error: (error) => console.error(error),
    });
  }


  public searchHero(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
    this.lengthHeroes = this.dataSource.filteredData.length;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public addHero() {
    this._router.navigate(['/add-hero']);
  }
}
