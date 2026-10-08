import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandsMarqueeComponent } from '../../shared/components/brands-marquee/brands-marquee.component';
import {
  ECOSYSTEM_STATS,
  NumbersComponent,
} from '../../shared/components/numbers/numbers.component';
import { Step, StepsBandComponent } from '../../shared/components/steps-band/steps-band.component';

interface PressItem {
  date: string;
  dateLabel: string;
  excerpt: string;
  outlet: string;
  title: string;
  url: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BrandsMarqueeComponent, NumbersComponent, RouterLink, StepsBandComponent],
  selector: 'app-home-page',
  styleUrl: './home.page.scss',
  templateUrl: './home.page.html',
})
export class HomePage {
  protected readonly stats = ECOSYSTEM_STATS;

  protected readonly steps: Step[] = [
    {
      text: 'Desenvolva seu repertório, conheça formatos e aprenda a transformar suas ideias em conteúdo com potencial de resultado. A Comu conecta aprendizado e prática para você começar.',
      title: 'Aprenda como se tornar um criador.',
    },
    {
      text: 'Tire suas ideias do papel, publique e teste na prática. Cada conteúdo é uma oportunidade de encontrar sua voz e se conectar com o seu público.',
      title: 'Crie para começar o jogo.',
    },
    {
      text: 'Acompanhe o que seu conteúdo gera, entenda os indicadores e ajuste a rota. Use cada aprendizado para evoluir sua criação e construir novas oportunidades de negócio.',
      title: 'Evolução e resultado.',
    },
  ];

  protected readonly press: PressItem[] = [
    {
      date: '2025-05-12',
      dateLabel: '12 MAI 2025',
      excerpt: 'Reportagem sobre a formação de criadores e a atuação da Comu no social commerce.',
      outlet: 'Economia Real',
      title: 'Da criação de conteúdo ao negócio',
      url: 'https://economiareal.uol.com.br/noticia/comercio/eles-treinam-criadores-para-vender-no-tiktok-e-ja-movimentam-r-50-mi-216',
    },
    {
      date: '2025-05-13',
      dateLabel: '13 MAI 2025',
      excerpt:
        'A Comu participa da conversa sobre profissionalização e criação de conteúdo para marcas.',
      outlet: 'Exame',
      title: 'UGC e novas possibilidades de trabalho com o TikTok Shop',
      url: 'https://exame.com/carreira/tiktok-shop-impulsiona-nova-profissao-ugc-creator-pode-ganhar-ate-r-20-mil-por-mes/',
    },
    {
      date: '2025-05-09',
      dateLabel: '09 MAI 2025',
      excerpt: 'A visão da Comu sobre a conexão entre conteúdo, criadores e vendas.',
      outlet: 'Startupi',
      title: 'TikTok Shop e as oportunidades para empresas',
      url: 'https://startupi.com.br/tiktok-shop-brasil-oportunidades-pmes-startups/',
    },
  ];
}
