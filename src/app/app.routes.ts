import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'heroes',
        loadComponent: () => import('./heroes/pages/heroeslist/heroeslist.component').then(c => c.HeroeslistComponent)
    },
    {
        path: 'add-hero',
        loadComponent: () => import('./heroes/pages/add-hero/add-hero.component').then(c => c.AddHeroComponent)
    },
    {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
    }
];
