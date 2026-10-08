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

/**
 * Indicadores do ecossistema. Os dois primeiros falam com marcas e os dois últimos com criadores:
 * a home usa todos, Para marcas usa `slice(0, 2)` e Para criadores usa `slice(2)`.
 */
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
    ariaLabel: '25 milhões de reais',
    digits: [2, 5],
    label: 'Pagos a criadores',
    prefix: 'R$',
    unit: 'mi',
  },
];

let nextId = 0;

/**
 * Bloco rosa "A força do nosso ecossistema" com números que rolam ao entrar na tela.
 * O número de colunas acompanha a quantidade de indicadores (até 4).
 */
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
  readonly note = input(
    'Indicadores do site institucional. Base e período em validação nesta revisão.',
  );

  protected readonly titleId = `numbers-title-${nextId++}`;

  /** Ativa a animação dos números quando o bloco entra na tela. */
  protected readonly running = signal(false);

  /** Rolo de dígitos: 0–9 duas vezes, para a animação dar uma volta completa. */
  protected readonly reel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef);
    const destroyRef = inject(DestroyRef);

    // Só roda no navegador (não no SSR/prerender).
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
