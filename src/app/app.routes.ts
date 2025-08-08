import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'heroes',
        loadComponent: () => import('./heroes/pages/heroeslist/heroeslist.component').then(c => c.HeroeslistComponent)
    },
    {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
    }
];
