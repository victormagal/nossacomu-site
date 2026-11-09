import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';

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
  private readonly router = inject(Router);

  protected readonly isMenuOpen = signal(false);
  protected readonly isBrandsOpen = signal(false);

  // "Para marcas" não é link: fica destacado quando a rota atual é de marcas.
  protected readonly isBrandsActive = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/solucoes-para-marcas')),
    ),
    { initialValue: this.router.url.startsWith('/solucoes-para-marcas') },
  );

  protected readonly navItems: NavItem[] = [
    { label: 'A Comu', path: '/' },
    { label: 'Para criadores', path: '/solucoes-para-criadores' },
    { label: 'Eventos', path: '/eventos' },
    { label: 'Carreiras', path: '/carreiras' },
  ];

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected toggleBrands(): void {
    this.isBrandsOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
    this.isBrandsOpen.set(false);
  }
}
