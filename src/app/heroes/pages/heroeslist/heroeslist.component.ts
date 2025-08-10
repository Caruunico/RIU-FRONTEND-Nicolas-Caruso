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
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from '../../components/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-heroeslist',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, HeaderComponent, RouterModule, MatButtonModule, MatMenuModule, MatIconModule, NgbModalModule, ConfirmDeleteComponent],
  providers: [HeroesEndpointsService],
  templateUrl: './heroeslist.component.html',
  styleUrl: './heroeslist.component.scss'
})
export class HeroeslistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _heroEndpointsService = inject(HeroesEndpointsService);
  private _heroService = inject(HeroesService);
  private _router = inject(Router);
  private modalService = inject(NgbModal);

  public displayedColumns: string[] = ['image', 'name', 'description', 'actions'];
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

  public deleteHero(hero: Hero){
     const modalRef = this.modalService.open(ConfirmDeleteComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.componentInstance.hero = hero;

    modalRef.result.then((result) => {
      if (!result) return;

      this._heroService.deleteHero(hero.id!)
    });
  }

  public goToAddHero() {
    this._router.navigate(['/add-hero']);
  }

  public goToEditHero(id: number){
    this._router.navigate(['/edit-hero/' + id]);
  }
}
