import { ChangeDetectionStrategy, Component } from '@angular/core';

export type Brand =
  | 'natura'
  | 'gummy'
  | 'mawwal'
  | 'simple-organic'
  | 'c-and-a'
  | 'bisyou'
  | 'riachuelo'
  | 'loreal'
  | 'guday'
  | 'adcos'
  | 'glade'
  | 'aura-beauty'
  | 'ysl'
  | 'maxfem'
  | 'primacial'
  | 'max-titanium'
  | 'avon'
  | 'nutrata'
  | 'blessy';

interface BrandRow {
  brands: Brand[];
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
    adcos: 'Adcos',
    avon: 'Avon',
    bisyou: 'Bisyou',
    blessy: 'Blessy',
    'aura-beauty': 'Aura Beauty',
    'c-and-a': 'C&A',
    glade: 'Glade',
    guday: 'Guday',
    gummy: 'Gummy',
    loreal: 'L’Oréal',
    maxfem: 'Maxfem',
    mawwal: 'Mawwal',
    'max-titanium': 'Max Titanium',
    natura: 'Natura',
    nutrata: 'Nutrata',
    primacial: 'Primacial',
    riachuelo: 'Riachuelo',
    'simple-organic': 'Simple Organic',
    ysl: 'Yves Saint Laurent',
  };

  protected readonly brandRows: BrandRow[] = [
    {
      brands: ['natura', 'gummy', 'mawwal', 'simple-organic', 'c-and-a', 'bisyou'],
    },
    {
      brands: ['riachuelo', 'loreal', 'guday', 'adcos', 'glade', 'aura-beauty'],
    },
    {
      brands: ['ysl', 'maxfem', 'primacial', 'max-titanium', 'avon', 'nutrata', 'blessy'],
    },
  ];

  protected readonly marqueeCopies = [0, 1, 2, 3];
}
