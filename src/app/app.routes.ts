import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./cats/pages/dashboard-page/dashboard-page.component').then(m => m.default),
    children: [
      {
        path: 'cats-gallery',
        loadComponent: () => import('./cats/pages/cat-gallery-page/cat-gallery-page.component').then(m => m.default)
      },
      {
        path: 'cats-votes',
        loadComponent: () => import('./cats/pages/cat-votes-page/cat-votes-page.component').then(m => m.default)
      },
      {
        path: 'cats-random',
        loadComponent: () => import('./cats/pages/cat-random-page/cat-random-page.component').then(m => m.default)
      },
      {
        path: 'cats-by-tag',
        loadComponent: () => import('./cats/pages/cat-by-tag-page/cat-by-tag-page.component').then(m => m.default)
      },
      {
        path: '',
        redirectTo: 'cats-gallery',
        pathMatch: 'full'
      },
      {
        path: '**',
        loadComponent: () => import('./shared/pages/not-found-page/not-found-page.component').then(m => m.default)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
