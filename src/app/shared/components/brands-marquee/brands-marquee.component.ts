import { ChangeDetectionStrategy, Component } from '@angular/core';

export type Brand = 'barbours' | 'sallve' | 'kokeshi' | 'caffeine' | 'gocase';

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
    caffeine: 'Caffeine Army',
    gocase: 'GoCase',
    kokeshi: 'Kokeshi',
    sallve: 'Sallve',
  };

  protected readonly brandRows: BrandRow[] = [
    { brands: ['barbours', 'sallve', 'kokeshi', 'caffeine', 'gocase'], decorative: false },
    { brands: ['caffeine', 'gocase', 'barbours', 'sallve', 'kokeshi'], decorative: true },
    { brands: ['kokeshi', 'barbours', 'gocase', 'sallve', 'caffeine'], decorative: true },
  ];

  /** Cada faixa repete a sequência 4x (2 grupos × 2 sequências) para o loop contínuo. */
  protected readonly marqueeCopies = [0, 1, 2, 3];
}
