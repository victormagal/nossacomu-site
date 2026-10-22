import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

export interface Stat {
  ariaLabel: string;
  digits: number[];
  label: string;
  prefix: string;
  unit: string;
}

export const ECOSYSTEM_STATS: Stat[] = [
  {
    ariaLabel: 'Mais de 40 mil',
    digits: [4, 0],
    label: 'Criadores no ecossistema',
    prefix: '+',
    unit: 'mil',
  },
  {
    ariaLabel: 'Mais de 200',
    digits: [2, 0, 0],
    label: 'Marcas parceiras',
    prefix: '+',
    unit: '',
  },
  {
    ariaLabel: '1 bilhão de reais',
    digits: [1],
    label: 'Em GMV movimentado pelos criadores',
    prefix: 'R$',
    unit: 'bi',
  },
  {
    ariaLabel: '100 milhões de reais',
    digits: [1, 0, 0],
    label: 'Em comissões',
    prefix: 'R$',
    unit: 'mi',
  },
];

let nextId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'numbers-host' },
  selector: 'app-numbers',
  styleUrl: './numbers.component.scss',
  templateUrl: './numbers.component.html',
})
export class NumbersComponent {
  readonly stats = input.required<Stat[]>();
  readonly eyebrow = input('A FORÇA DO NOSSO ECOSSISTEMA');

  protected readonly titleId = `numbers-title-${nextId++}`;

  protected readonly running = signal(false);

  protected readonly reel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.running.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.35 },
      );
      observer.observe(host.nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
