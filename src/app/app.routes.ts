import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main/main.layout').then((m) => m.MainLayout),
    children: [
      {
        path: '',
        title: 'Comu | Criação, comunidade e negócios',
        loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'solucoes-para-criadores',
        title: 'Comu para criadores | Comunidade e desenvolvimento',
        loadComponent: () =>
          import('./features/para-criadores/para-criadores.page').then((m) => m.ForCreatorsPage),
      },
      {
        path: 'solucoes-para-marcas',
        title: 'Comu para marcas | Criadores, conteúdo e social commerce',
        loadComponent: () =>
          import('./features/para-marcas/para-marcas.page').then((m) => m.ForBrandsPage),
      },
      {
        path: 'eventos',
        title: 'Eventos Comu | Encontros, experiências e comunidade',
        loadComponent: () => import('./features/eventos/eventos.page').then((m) => m.EventsPage),
      },
      {
        path: 'carreiras',
        title: 'Carreiras na Comu | Nosso propósito e oportunidades',
        loadComponent: () => import('./features/carreiras/carreiras.page').then((m) => m.CarreirasPage),
      },
      {
        path: 'na-midia',
        title: 'Comu na Mídia | Reportagens e entrevistas',
        loadComponent: () => import('./features/na-midia/na-midia.page').then((m) => m.NaMidiaPage),
      },
    ],
  },
];
