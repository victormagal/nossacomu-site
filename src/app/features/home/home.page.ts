import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild
} from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home-page',
  styleUrl: './home.page.scss',
  templateUrl: './home.page.html',
  imports: [ButtonComponent],
})
export class HomePage {
  private readonly cardsCarousel = viewChild.required<ElementRef<HTMLElement>>('cardsCarousel');

  openItems = new Set<number>();

  scrollCards(direction: -1 | 1) {
    const carousel = this.cardsCarousel().nativeElement;
    const card = carousel.querySelector<HTMLElement>('.card-be-part-of');

    if (!card) {
      return;
    }

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;
    const distance = card.getBoundingClientRect().width + gap;

    carousel.scrollBy({
      behavior: 'smooth',
      left: direction * distance,
    });
  }

  toggle(index: number) {
    if (this.openItems.has(index)) {
      this.openItems.delete(index);
    } else {
      this.openItems.add(index);
    }
  }

  isOpen(index: number) {
    return this.openItems.has(index);
  }
}