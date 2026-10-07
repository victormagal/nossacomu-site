import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected readonly navItems: NavItem[] = [
    { label: 'A Comu', path: '/' },
    { label: 'Para criadores', path: '/solucoes-para-criadores' },
    { label: 'Para marcas', path: '/solucoes-para-marcas' },
    { label: 'Eventos', path: '/eventos' },
    { label: 'Carreiras', path: '/carreiras' },
    { label: 'Na Mídia', path: '/na-midia' },
  ];
}
