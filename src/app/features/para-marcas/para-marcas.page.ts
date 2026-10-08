import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandsMarqueeComponent } from '../../shared/components/brands-marquee/brands-marquee.component';
import { FaqComponent, FaqItem } from '../../shared/components/faq/faq.component';
import { Step, StepsBandComponent } from '../../shared/components/steps-band/steps-band.component';
import {
  ECOSYSTEM_STATS,
  NumbersComponent,
} from '../../shared/components/numbers/numbers.component';

interface Benefit {
  text: string;
  title: string;
}

interface CaseStudy {
  /** Arquivo em /images/brands (logo vetorizado). */
  logo: 'gocase' | 'sallve' | 'caffeine' | 'kokeshi' | 'embelleze' | 'barbours';
  name: string;
  label: string;
  value: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BrandsMarqueeComponent, FaqComponent, NumbersComponent, RouterLink, StepsBandComponent],
  selector: 'app-para-marcas-page',
  styleUrl: './para-marcas.page.scss',
  templateUrl: './para-marcas.page.html',
})
export class ForBrandsPage {
  /** Indicadores do ecossistema voltados a marcas. */
  protected readonly stats = ECOSYSTEM_STATS.slice(0, 2);

  /** Formulário comercial da Comu ("Conversar sobre meu projeto"). */
  protected readonly contactUrl = 'https://form.typeform.com/to/F3h5dgUh';

  protected readonly cases: CaseStudy[] = [
    {
      logo: 'barbours',
      name: "Barbour's",
      label: 'em um período de 6 meses',
      value: '+5 milhões em GMV',
    },
    {
      logo: 'embelleze',
      name: 'Embelleze',
      label: 'em um período de 6 meses',
      value: '+8 mil criadores colaboradores',
    },
    {
      logo: 'kokeshi',
      name: 'Kokeshi',
      label: 'em um período de 6 meses',
      value: '+75.000 conteúdos produzidos',
    },
  ];

  protected readonly benefits: Benefit[] = [
    {
      text: 'Conecte sua marca a perfis que façam sentido para o público, o produto e a linguagem da campanha.',
      title: 'Esquadrão de creators sellers focados em resultado.',
    },
    {
      text: 'Desenvolva projetos de conteúdo com um direcionamento claro, do que precisa ser comunicado ao que será observado depois da entrega.',
      title: 'Conteúdo focado em vendas.',
    },
    {
      text: 'Explore a conexão entre conteúdo, descoberta e compra em iniciativas como o TikTok Shop, conforme o momento e a operação da sua marca.',
      title: 'Social commerce na prática.',
    },
    {
      text: 'Use as entregas e os resultados do projeto para identificar aprendizados e orientar os próximos testes.',
      title: 'Acompanhamento para evoluir.',
    },
  ];

  protected readonly steps: Step[] = [
    {
      text: 'Você compartilha o contexto da marca, o produto e o que quer construir.',
      title: 'Entendemos o projeto.',
    },
    {
      text: 'Alinhamos escopo, criadores, formatos, responsabilidades e o que será acompanhado.',
      title: 'Definimos o caminho.',
    },
    {
      text: 'O projeto segue os combinados de criação, aprovação e entrega.',
      title: 'Colocamos em prática.',
    },
    {
      text: 'Reunimos os resultados disponíveis e discutimos os próximos passos.',
      title: 'Aprendemos com a operação.',
    },
  ];

  protected readonly faq: FaqItem[] = [
    {
      answer: [
        'A definição considera o objetivo, o público e o contexto da campanha. O processo e os critérios são alinhados na proposta.',
      ],
      question: 'Como a Comu define os criadores de um projeto?',
    },
    {
      answer: [
        'O TikTok Shop é uma frente de atuação da Comu. O ecossistema também reúne conteúdo, educação, comunidade e experiências. Converse com o time para entender o que faz sentido para o seu projeto.',
      ],
      question: 'A Comu atua apenas no TikTok Shop?',
    },
    {
      answer: [
        'Investimento e prazo dependem do escopo, dos formatos, do volume e das etapas de aprovação. Esses pontos são definidos antes do início do projeto.',
      ],
      question: 'Quanto custa e quanto tempo leva?',
    },
    {
      answer: [
        'As permissões de uso precisam ser combinadas no projeto. Canais, prazo, formatos e eventual uso em mídia devem estar previstos na contratação.',
      ],
      question: 'Posso usar o conteúdo em anúncios e outros canais?',
    },
    {
      answer: [
        'Os indicadores e a forma de acompanhamento são alinhados ao objetivo e às informações disponíveis em cada projeto.',
      ],
      question: 'Como os resultados são acompanhados?',
    },
  ];
}
