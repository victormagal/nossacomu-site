import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-para-criadores-page',
  styleUrl: './eventos.page.scss',
  templateUrl: './eventos.page.html',
  imports: [],
})
export class EventsPage {
  private readonly eventCarousel = viewChild.required<ElementRef<HTMLElement>>('eventCarousel');
  private readonly eventCarousel2 = viewChild.required<ElementRef<HTMLElement>>('eventCarousel2');
  private readonly learningCarousel =
    viewChild.required<ElementRef<HTMLElement>>('learningCarousel');
  private readonly storiesCarousel = viewChild.required<ElementRef<HTMLElement>>('storiesCarousel');

  openItems = new Set<number>();

  scrollEvent(direction: -1 | 1) {
    this.scrollCarousel(this.eventCarousel().nativeElement, '.event-image', direction);
  }

  scrollEvent2(direction: -1 | 1) {
    this.scrollCarousel(this.eventCarousel2().nativeElement, '.event-image', direction);
  }

  scrollLearning(direction: -1 | 1) {
    this.scrollCarousel(this.learningCarousel().nativeElement, '.card-learning', direction);
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
