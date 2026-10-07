import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface Step {
  text: string;
  title: string;
}

/**
 * Faixa escura "Nosso jeito de fazer": eyebrow, título, texto opcional e passos numerados.
 * Com 3 passos: 3 colunas a partir do tablet. Com 4 passos: 2 colunas no tablet e 4 no desktop.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'steps' },
  selector: 'app-steps-band',
  styleUrl: './steps-band.component.scss',
  templateUrl: './steps-band.component.html',
})
export class StepsBandComponent {
  readonly eyebrow = input('NOSSO JEITO DE FAZER');
  /** Linhas do título (cada item vira uma linha). */
  readonly titleLines = input.required<string[]>();
  readonly intro = input<string>();
  readonly steps = input.required<Step[]>();
}
