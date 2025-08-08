import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HeroesEndpointsService } from '../../services/heroes-endpoints/heroes-endpoints.service';
import { Hero } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroeslist',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  providers: [HeroesEndpointsService],
  templateUrl: './heroeslist.component.html',
  styleUrl: './heroeslist.component.scss'
})
export class HeroeslistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private heroService = inject(HeroesEndpointsService);

  public displayedColumns: string[] = ['image', 'name', 'description'];
  public dataSource = new MatTableDataSource<Hero>([]);

  public heroes: Hero[] = [];
  public totalPages: number = 1;
  public heroesPerPage = 5;

  ngOnInit(): void {
    this.loadHeroes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadHeroes(): void {
    this.heroService.getHeroes().subscribe({
      next: (heroes: Hero[]) => {
        this.heroes = heroes;
        this.dataSource = new MatTableDataSource<Hero>(this.heroes)
        this.totalPages = Math.ceil(heroes.length / this.heroesPerPage);
      },
      error: (error) => console.error(error),
    });
  }
}
