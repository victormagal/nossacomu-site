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
  private readonly storiesCarousel = viewChild.required<ElementRef<HTMLElement>>('storiesCarousel');

  openItems = new Set<number>();

  scrollCards(direction: -1 | 1) {
    this.scrollCarousel(this.cardsCarousel().nativeElement, '.card-be-part-of', direction);
  }

  scrollStories(direction: -1 | 1) {
    this.scrollCarousel(this.storiesCarousel().nativeElement, '.story', direction);
  }

  private scrollCarousel(carousel: HTMLElement, itemSelector: string, direction: -1 | 1) {
    const item = carousel.querySelector<HTMLElement>(itemSelector);

    if (!item) {
      return;
    }

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;
    const distance = item.getBoundingClientRect().width + gap;

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