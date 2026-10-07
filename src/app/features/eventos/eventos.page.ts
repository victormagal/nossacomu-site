import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaqComponent, FaqItem } from '../../shared/components/faq/faq.component';

interface TickerItem {
  fragment: string;
  label: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FaqComponent, RouterLink],
  selector: 'app-eventos-page',
  styleUrl: './eventos.page.scss',
  templateUrl: './eventos.page.html',
})
export class EventsPage {
  protected readonly instagramUrl = 'https://www.instagram.com/nossa.comu/';

  /** Faixa rosa com atalhos para cada experiência. */
  protected readonly tickerItems: TickerItem[] = [
    { fragment: 'well-day', label: 'WELLDAY' },
    { fragment: 'awards', label: 'AWARDS' },
    { fragment: 'academy', label: 'ACADEMY' },
  ];

  /** A faixa repete a sequência 6x (2 grupos × 3) para o loop contínuo; só a primeira é acessível. */
  protected readonly tickerCopies = [0, 1, 2, 3, 4, 5];

  protected readonly wellDayTopics = [
    'Atividades de wellness',
    'Experiências com marcas',
    'Conexão entre criadores',
  ];

  protected readonly awardsTopics = [
    'Reconhecimento de criadores',
    'Ativações e experiências',
    'Encontros e celebração',
  ];

  protected readonly academyTopics = [
    'Estratégia e posicionamento',
    'TikTok Shop e vendas',
    'Roteiro e comunicação',
    'Criação e edição de conteúdo',
    'Plano de ação',
  ];

  protected readonly faq: FaqItem[] = [
    {
      answer: [
        'As datas, os locais e as orientações de inscrição são divulgados nos canais oficiais da Comu. Confira a programação de cada edição antes de se organizar para participar.',
      ],
      question: 'Como acompanho as próximas edições?',
    },
    {
      answer: [
        'O formato e os critérios de participação variam conforme a edição. Consulte as informações do evento para saber a quem ele se destina e como participar.',
      ],
      question: 'Todos os eventos são abertos ao público?',
    },
    {
      answer: [
        'Conheça as ',
        { path: '/solucoes-para-marcas', text: 'soluções para marcas' },
        ' para entender como a Comu conecta marcas, criadores e experiências. O escopo é definido para cada projeto.',
      ],
      question: 'Minha marca pode participar de uma experiência?',
    },
  ];
}
