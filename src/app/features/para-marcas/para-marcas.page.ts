import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandsMarqueeComponent } from '../../shared/components/brands-marquee/brands-marquee.component';
import { FaqComponent, FaqItem } from '../../shared/components/faq/faq.component';
import { Step, StepsBandComponent } from '../../shared/components/steps-band/steps-band.component';

interface Benefit {
  icon: 'creators' | 'target' | 'commerce' | 'growth';
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

interface Testimonial {
  name?: string;
  photo?: string;
  program: string;
  instagram?: string;
  tiktok?: string;
  quote: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BrandsMarqueeComponent, FaqComponent, RouterLink, StepsBandComponent],
  selector: 'app-para-marcas-page',
  styleUrl: './para-marcas.page.scss',
  templateUrl: './para-marcas.page.html',
})
export class ForBrandsPage {
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

  protected readonly testimonials: Testimonial[] = [
    {
      name: 'Juliana Vallier',
      photo: '/images/depoimentos/juliana-embelleze.webp',
      program: 'Gerenciamento de Afiliados da Embelleze',
      quote:
        'Nossa experiência com a Comu tem sido incrível! Desde o início, fomos muito bem recebidos pelo time. O que mais gostamos é justamente essa proximidade e o cuidado que eles têm com cada demanda, sempre buscando soluções e novas ideias para fazer as coisas acontecerem. É muito bom trabalhar com pessoas que realmente se importam, estão sempre disponíveis para trocar ideias e fazem a gente sentir que estamos no mesmo time! Estamos muito felizes com essa parceria e tenho certeza de que ainda vamos construir muita coisa boa juntos! 💜',
    },
    {
      name: 'Luane Lohn',
      photo: '/images/depoimentos/luane-lohn.webp',
      program: 'CEO da Ciclo Cosméticos',
      quote:
        'Na Ciclo, acreditamos no poder das conexões autênticas e no protagonismo das criadoras de conteúdo na transformação do mercado. Encontramos na COMU uma parceira que compartilha dessa visão, valorizando talentos, desenvolvendo oportunidades e aproximando marcas e criadoras de forma estratégica. É muito bom construir essa parceria com quem entende que o futuro do social commerce passa por pessoas, criatividade e relações genuínas. Temos orgulho de fazer parte desse movimento ao lado da COMU!',
    },
    {
      name: 'Thais Feitosa',
      photo: '/images/depoimentos/thais-feitosa.webp',
      program: 'Analisa de Marketing - Sallve e Contém1g',
      quote:
        'Trabalhar com a COMU tem sido incrível. Hoje é a nossa principal agência de afiliados na Sallve e na Contém1g, e o que faz a diferença é a combinação de proximidade com visão de negócio: o time entende o nosso jeito de comunicar, cuida da relação com os afiliados com muito carinho e está sempre trazendo ideias novas. É uma parceria que a gente vem fortalecendo cada vez mais.',
    },
  ];

  protected instagramUrl(handle: string): string {
    return `https://www.instagram.com/${handle.replace(/^@/, '')}`;
  }

  protected tiktokUrl(handle: string): string {
    return `https://www.tiktok.com/${handle.startsWith('@') ? handle : '@' + handle}`;
  }

  protected readonly benefits: Benefit[] = [
    {
      icon: 'creators',
      text: 'Conecte sua marca a perfis que façam sentido para o público, o produto e a linguagem da campanha.',
      title: 'Esquadrão de creators sellers focados em resultado.',
    },
    {
      icon: 'target',
      text: 'Desenvolva projetos de conteúdo com um direcionamento claro, do que precisa ser comunicado ao que será observado depois da entrega.',
      title: 'Conteúdo focado em vendas.',
    },
    {
      icon: 'commerce',
      text: 'Explore a conexão entre conteúdo, descoberta e compra em iniciativas como o TikTok Shop, conforme o momento e a operação da sua marca.',
      title: 'Social commerce na prática.',
    },
    {
      icon: 'growth',
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
