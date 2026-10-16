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
  program: 'Comu Base' | 'Comu+' | 'Star Club';
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
  protected readonly stats = ECOSYSTEM_STATS.slice(2);

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
      program: 'Comu+',
      quote: 'Amei sua análise, abriu muito a minha mente e me deu muita clareza do próximo passo.',
    },
    {
      name: 'Mary Jayne',
      program: 'Comu+',
      quote: 'Tirei vários insights, feliz por ter entrado na Comu+.',
    },
    {
      name: 'Maria Fernanda',
      program: 'Star Club',
      quote:
        'Voltei para o Nível 5. A meta, agora, é chegar no nível 6! Gostaria de agradecer todo o suporte e ajuda maravilhosa de vocês.',
    },
    {
      name: 'Jully Islene',
      program: 'Comu Base',
      quote: 'Com certeza isso aqui é ouro pra gente que está começando.',
    },
    {
      program: 'Comu Base',
      quote:
        'Minha melhor escolha no TikTok Shop. Tô investindo nos produtos parceiros, produzindo conteúdo com base no estudo e conhecimento da marca e tá fazendo diferença.',
    },
    {
      program: 'Comu Base',
      quote:
        'Amei a análise, me deu várias ideias e agora vou colocar em prática para melhorar meus vídeos.',
    },
  ];

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
