import { ChangeDetectionStrategy, Component } from '@angular/core';

export type Brand =
  | 'barbours'
  | 'sallve'
  | 'kokeshi'
  | 'caffeine'
  | 'gocase'
  | 'embelleze'
  | 'bn-cachos'
  | 'online-editora';

interface BrandRow {
  brands: Brand[];
  /** Linhas 2 e 3 são decorativas (aria-hidden). */
  decorative: boolean;
}

/** Faixas de logos em movimento ("Marcas que já criaram com a Comu."). Usado em A Comu e Para marcas. */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-brands-marquee',
  styleUrl: './brands-marquee.component.scss',
  templateUrl: './brands-marquee.component.html',
})
export class BrandsMarqueeComponent {
  protected readonly brandNames: Record<Brand, string> = {
    barbours: 'Barbour’s',
    'bn-cachos': 'BN Cachos',
    caffeine: 'Caffeine Army',
    embelleze: 'Embelleze',
    gocase: 'GoCase',
    kokeshi: 'Kokeshi',
    'online-editora': 'On line Editora',
    sallve: 'Sallve',
  };

  protected readonly brandRows: BrandRow[] = [
    {
      brands: [
        'barbours',
        'sallve',
        'embelleze',
        'kokeshi',
        'caffeine',
        'bn-cachos',
        'gocase',
        'online-editora',
      ],
      decorative: false,
    },
    {
      brands: [
        'caffeine',
        'online-editora',
        'gocase',
        'barbours',
        'bn-cachos',
        'sallve',
        'embelleze',
        'kokeshi',
      ],
      decorative: true,
    },
    {
      brands: [
        'bn-cachos',
        'kokeshi',
        'barbours',
        'embelleze',
        'gocase',
        'online-editora',
        'sallve',
        'caffeine',
      ],
      decorative: true,
    },
  ];

  /** Cada faixa repete a sequência 4x (2 grupos × 2 sequências) para o loop contínuo. */
  protected readonly marqueeCopies = [0, 1, 2, 3];
}
