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
                path: 'para-creators',
                loadComponent: () => import('./features/para-creators/para-creators.page').then(m => m.ForCreatorsPage)
            },
            {
                path: 'para-marcas',
                loadComponent: () => import('./features/para-marcas/para-marcas.page').then(m => m.ForBrandsPage)
            },
            {
                path: 'solucoes-criadores',
                loadComponent: () => import('./features/solucoes-criadores/solucoes-criadores.page').then(m => m.SolutionsForCriatorsPage)
            },
            {
                path: 'solucoes-marcas',
                loadComponent: () => import('./features/solucoes-marcas/solucoes-marcas.page').then(m => m.SolutionsForBrandsPage)
            },
        ],
    },
];
