import { Routes } from '@angular/router';

export const routes: Routes = [
{
  path: 'dashboard',
  loadComponent
  : () => import('./cats/pages/dashboard-page/dashboard-page.component'),



  children: [
    {
      path: 'cats-gallery',
      loadComponent: () => import('./cats/pages/cat-gallery-page/cat-gallery-page.component')
    },
    {
      path: 'cats-votes',
      loadComponent: () => import('./cats/pages/cat-votes-page/cat-votes-page.component'),
    },
    {
      path: '**',
      loadComponent: () => import('./shared/pages/not-found-page/not-found-page.component')
    }
  ],
},
{
  path: '**',
  loadComponent: () => import('./shared/pages/not-found-page/not-found-page.component')
}

];
