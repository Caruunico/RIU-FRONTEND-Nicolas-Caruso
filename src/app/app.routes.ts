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
        path: 'edit-hero/:id',
        loadComponent: () => import('./heroes/pages/edit-hero/edit-hero.component').then(c => c.EditHeroComponent)
    },
    {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
    }
];
