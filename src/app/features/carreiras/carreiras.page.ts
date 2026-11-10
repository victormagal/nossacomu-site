import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { FaqComponent, FaqItem } from '../../shared/components/faq/faq.component';
import { formatarDataCard, Vaga, VagasService } from './vagas.service';

interface Value {
  text: string;
  title: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FaqComponent, RouterLink],
  selector: 'app-carreiras-page',
  styleUrl: './carreiras.page.scss',
  templateUrl: './carreiras.page.html',
})
export class CarreirasPage {
  private readonly vagasService = inject(VagasService);
  protected readonly formatarData = formatarDataCard;

  // Sem vagas ou com o WordPress fora do ar, a página mostra o aviso de "sem vagas abertas".
  protected readonly vagas = toSignal(
    this.vagasService.listar().pipe(catchError(() => of([] as Vaga[]))),
    { initialValue: [] as Vaga[] },
  );

  protected readonly values: Value[] = [
    {
      text: 'Autenticidade para encontrar caminhos próprios e dar forma a novas possibilidades.',
      title: 'Ousada.',
    },
    {
      text: 'Disposição para começar, experimentar e aprender ao longo do caminho.',
      title: 'Corajosa.',
    },
    {
      text: 'Criação que aproxima pessoas e convida a colocar ideias em prática.',
      title: 'Inspiradora.',
    },
    { text: 'Foco e constância para seguir construindo com intenção.', title: 'Obstinada.' },
  ];

  protected readonly faq: FaqItem[] = [
    {
      answer: [
        'As vagas abertas aparecem nesta página, com a descrição de cada posição e as orientações para se candidatar.',
      ],
      question: 'Há vagas abertas na Comu?',
    },
    {
      answer: [
        'Ainda não temos um canal de candidaturas ou banco de talentos aberto. As orientações para se candidatar serão apresentadas junto de cada vaga.',
      ],
      question: 'Posso enviar meu currículo?',
    },
    {
      answer: [
        'Para conhecer a comunidade e as iniciativas para criadores, acesse ',
        { path: '/solucoes-para-criadores', text: 'Soluções para criadores' },
        '. Esta página é dedicada a oportunidades de trabalho no time da Comu.',
      ],
      question: 'Quero participar como criador. Este é o lugar?',
    },
  ];
}
