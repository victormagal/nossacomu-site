import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Trecho de resposta: texto simples ou link interno. */
export type FaqAnswerPart = string | { path: string; text: string };

export interface FaqItem {
  answer: FaqAnswerPart[];
  question: string;
}

/** Seção "Perguntas frequentes" (SEM RODEIOS) com respostas recolhíveis. */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'faq' },
  imports: [RouterLink],
  selector: 'app-faq',
  styleUrl: './faq.component.scss',
  templateUrl: './faq.component.html',
})
export class FaqComponent {
  readonly items = input.required<FaqItem[]>();

  protected isLink(part: FaqAnswerPart): part is { path: string; text: string } {
    return typeof part !== 'string';
  }
}
