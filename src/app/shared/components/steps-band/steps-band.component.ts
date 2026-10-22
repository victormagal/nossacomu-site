import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface Step {
  text: string;
  title: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'steps' },
  selector: 'app-steps-band',
  styleUrl: './steps-band.component.scss',
  templateUrl: './steps-band.component.html',
})
export class StepsBandComponent {
  readonly eyebrow = input('NOSSO JEITO DE FAZER');
  readonly titleLines = input.required<string[]>();
  readonly intro = input<string>();
  readonly steps = input.required<Step[]>();
}
