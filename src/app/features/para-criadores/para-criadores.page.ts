import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaqComponent, FaqItem } from '../../shared/components/faq/faq.component';
import { Step } from '../../shared/components/steps-band/steps-band.component';
import {
  ECOSYSTEM_STATS,
  NumbersComponent,
} from '../../shared/components/numbers/numbers.component';

interface Benefit {
  text: string;
  title: string;
}

interface Course {
  title: string;
  url: string;
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
  imports: [FaqComponent, NumbersComponent, RouterLink],
  selector: 'app-para-criadores-page',
  styleUrl: './para-criadores.page.scss',
  templateUrl: './para-criadores.page.html',
})
export class ForCreatorsPage {
  protected readonly stats = ECOSYSTEM_STATS;

  protected readonly comuPlusUrl = 'https://comumais.com.br/';
  protected readonly appStoreUrl =
    'https://apps.apple.com/us/app/comu-comunidade-para-creators/id6796062450';
  protected readonly googlePlayUrl =
    'https://play.google.com/store/apps/details?id=com.nossacomu.comunidade';

  protected readonly benefits: Benefit[] = [
    {
      text: 'Conheça a comunidade, troque com outros creators e descubra por onde começar. Ninguém aqui cria sozinho.',
      title: 'Encontre seu ponto de partida.',
    },
    {
      text: 'Conteúdos e formações para ampliar seu repertório, testar formatos, sair do automático e criar em volume.',
      title: 'Desenvolva suas habilidades.',
    },
    {
      text: 'Publique, teste e entenda o que observar no seu conteúdo para saber qual é o próximo passo.',
      title: 'Coloque em prática.',
    },
    {
      text: 'Conforme você evolui, mais portas se abrem para marcas, amostras, eventos e iniciativas do ecossistema.',
      title: 'Cresça com novas oportunidades.',
    },
  ];

  protected readonly testimonials: Testimonial[] = [
    {
      name: 'Ana Gabriela Cociani da Silva',
      photo: '/images/depoimentos/ana-gabriela-cociani.webp',
      program: 'Comu+',
      instagram: '@agabrielacociani',
      tiktok: '@gabeecreator',
      quote:
        'Não saía do nível 1, subi para nível 3 após entrar para Comu+ e ser convidada para o evento da comu Award, voltei com muitos insight e então do nível 1 fui para o 2 em 4 dias, e para o nível 3 em 15 dias. Comecei a receber amostras de marcas que sempre sonhei. E ainda consegui comprar uma viagem para levar minha mãe para andar de avião pela primeira vez, com hotel, passeios, tudo com dinheiro do TikTok 🩷era um sonho.',
    },
    {
      name: 'Aline Nozaki Sasaki',
      photo: '/images/depoimentos/aline-nozaki-sasaki.webp',
      program: 'Comu+',
      instagram: '@alinenozaki',
      tiktok: '@alinenozaki',
      quote:
        'Pedir demissão do CLT e viver de TikTok Shop, ganhar liberdade territorial para trabalhar. Poder trabalhar de qualquer lugar do mundo e o potencial de ganho que depende exclusivamente de cada um. Comissões diferenciadas e campanhas com marcas incríveis. A oportunidade de levar minha mãe para Disney comigo nesse ano.',
    },
    {
      name: 'Stefany Aguiar Souza',
      photo: '/images/depoimentos/stefany-aguiar-souza.webp',
      program: 'Comu+',
      instagram: '@stefanyaguiar.s',
      tiktok: '@stefany.aguiars',
      quote:
        'Eu estava no nível 2 emperrada lá rsrs entrei no início de de agosto com 16 dias subi para o nível 3. Foi incrível a diferença do número de vendas, amostrar sendo aceitas. Meus vídeos continuam a mesma pegando, por isso me prova que a diferença veio de estar dentro da comunidade mesmo. Estou muito satisfeita. Subi de nível e estou conseguindo mais amostras e com marcas grandes!!!',
    },
    {
      name: 'Juliana Vallier',
      program: 'Gerenciamento de Afiliados',
      quote:
        'Nossa experiência com a Comu tem sido incrível!\n' +
        '\n' +
        'Desde o início, fomos muito bem recebidos pelo time. O que mais gostamos é justamente essa proximidade e o cuidado que eles têm com cada demanda, sempre buscando soluções e novas ideias para fazer as coisas acontecerem.\n' +
        '\n' +
        'É muito bom trabalhar com pessoas que realmente se importam, estão sempre disponíveis para trocar ideias e fazem a gente sentir que estamos no mesmo time!\n' +
        '\n' +
        'Estamos muito felizes com essa parceria e tenho certeza de que ainda vamos construir muita coisa boa juntos! 💜\n',
    },
  ];

  protected instagramUrl(handle: string): string {
    return `https://www.instagram.com/${handle.replace(/^@/, '')}`;
  }

  protected tiktokUrl(handle: string): string {
    return `https://www.tiktok.com/${handle.startsWith('@') ? handle : '@' + handle}`;
  }

  protected readonly communityPerks = [
    'Conteúdos para explorar',
    'Troca entre criadores',
    'Iniciativas do ecossistema',
  ];

  protected readonly courses: Course[] = [
    {
      title: 'Shop Creator',
      url: 'https://hotmart.com/pt-br/marketplace/produtos/certificacao-shop-creator/Y104039560N',
    },
    {
      title: 'Live Shop Pro',
      url: 'https://hotmart.com/pt-br/marketplace/produtos/live-pro-shop/Y104415160H',
    },
  ];

  protected readonly faq: FaqItem[] = [
    {
      answer: [
        'Você pode conhecer a Comu em diferentes momentos da sua trajetória. Cada produto, programa ou campanha informa os requisitos para participação.',
      ],
      question: 'Preciso já trabalhar como criador?',
    },
    {
      answer: [
        'As regras variam conforme a iniciativa. Consulte os requisitos do programa ou da oportunidade que você quer acessar antes de se inscrever.',
      ],
      question: 'Preciso ter TikTok Shop ativo?',
    },
    {
      answer: [
        'A comunidade gratuita é o espaço de conexão do ecossistema. O Comu+ é um produto com uma oferta própria. Confira o que está incluído, as condições e o formato de acesso na página do produto.',
      ],
      question: 'Qual é a diferença entre a comunidade e o Comu+?',
    },
    {
      answer: [
        'A entrada não garante contratação, campanhas ou uma renda específica. As oportunidades dependem do perfil, das necessidades de cada projeto e dos critérios de seleção.',
      ],
      question: 'Entrar garante trabalho com marcas ou renda?',
    },
    {
      answer: ['Confira a oferta vigente e as condições de contratação na página de cada produto.'],
      question: 'Como vejo valores e condições?',
    },
  ];
}
