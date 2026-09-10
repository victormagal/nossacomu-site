import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/main/main.layout').then(m => m.MainLayout),
        children: [
            {
                path: '',
                loadComponent: () => import('./features/home/home.page').then(m => m.HomePage)
            },
            {
                path: 'solucoes-para-criadores',
                loadComponent: () => import('./features/para-criadores/para-criadores.page').then(m => m.ForCreatorsPage)
            },
            {
                path: 'solucoes-para-marcas',
                loadComponent: () => import('./features/para-marcas/para-marcas.page').then(m => m.ForBrandsPage)
            },
        ],
    },
];
