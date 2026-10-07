import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PressArticle {
  /** Data no formato ISO (atributo datetime). */
  date: string;
  /** Data exibida, ex.: "12 MAI 2025". */
  dateLabel: string;
  excerpt: string;
  outlet: string;
  title: string;
  url: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink],
  selector: 'app-na-midia-page',
  styleUrl: './na-midia.page.scss',
  templateUrl: './na-midia.page.html',
})
export class NaMidiaPage {
  /** Matéria em destaque (título montado no template, com quebra e destaque). */
  protected readonly featured: PressArticle = {
    date: '2025-05-12',
    dateLabel: '12 MAI 2025',
    excerpt: 'Reportagem sobre a formação de criadores e a atuação da Comu no social commerce.',
    outlet: 'Economia Real',
    title: 'Da criação de conteúdo ao negócio.',
    url: 'https://economiareal.uol.com.br/noticia/comercio/eles-treinam-criadores-para-vender-no-tiktok-e-ja-movimentam-r-50-mi-216',
  };

  protected readonly ugc: PressArticle = {
    date: '2025-05-13',
    dateLabel: '13 MAI 2025',
    excerpt:
      'A Comu participa da conversa sobre profissionalização e criação de conteúdo para marcas.',
    outlet: 'Exame',
    title: 'UGC e novas possibilidades de trabalho com o TikTok Shop',
    url: 'https://exame.com/carreira/tiktok-shop-impulsiona-nova-profissao-ugc-creator-pode-ganhar-ate-r-20-mil-por-mes/',
  };

  protected readonly briefs: PressArticle[] = [
    {
      date: '2025-04-24',
      dateLabel: '24 ABR 2025',
      excerpt: 'Entrevista com Gabriel Lira sobre aprendizado, prática e profissionalização.',
      outlet: 'RH Pra Você',
      title: 'Os caminhos para se tornar um criador',
      url: 'https://rhpravoce.com.br/redacao/boom-da-creator-economy-tambem-posso-ser-um-influenciador',
    },
    {
      date: '2025-04-17',
      dateLabel: '17 ABR 2025',
      excerpt: 'Orientações sobre presença digital, conteúdo e conexão com o público.',
      outlet: 'Você S/A',
      title: 'Creator economy para quem empreende',
      url: 'https://vocesa.abril.com.br/empreendedorismo/creator-economy-para-empreendedores-como-profissionalizar-suas-redes-sociais/',
    },
  ];

  protected readonly market: PressArticle = {
    date: '2025-05-09',
    dateLabel: '09 MAI 2025',
    excerpt: 'A visão da Comu sobre a conexão entre conteúdo, criadores e vendas.',
    outlet: 'Startupi',
    title: 'TikTok Shop e as oportunidades para empresas',
    url: 'https://startupi.com.br/tiktok-shop-brasil-oportunidades-pmes-startups/',
  };
}
