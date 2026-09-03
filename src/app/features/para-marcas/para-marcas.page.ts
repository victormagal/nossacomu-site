import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
  signal,
} from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-para-marcas-page',
  styleUrl: './para-marcas.page.scss',
  templateUrl: './para-marcas.page.html',
  imports: [ButtonComponent],
})
export class ForBrandsPage {
  private readonly cardsCarousel = viewChild.required<ElementRef<HTMLElement>>('cardsCarousel');
  private readonly eventsCarousel = viewChild.required<ElementRef<HTMLElement>>('eventsCarousel');
  private readonly learningCarousel = viewChild.required<ElementRef<HTMLElement>>('learningCarousel');
  private readonly storiesCarousel = viewChild.required<ElementRef<HTMLElement>>('storiesCarousel');

  openItems = new Set<number>();

  scrollCards(direction: -1 | 1) {
    this.scrollCarousel(this.cardsCarousel().nativeElement, '.card-be-part-of', direction);
  }

  scrollEvents(direction: -1 | 1) {
    this.scrollCarousel(this.eventsCarousel().nativeElement, '.card-event', direction);
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

  // Signal-backed form fields
  name = signal('');
  mail = signal('');
  phone = signal('');

  submitForm(event?: Event) {
    event?.preventDefault();

    const payload = {
      name: this.name(),
      mail: this.mail(),
      phone: this.phone(),
    };

    // For now just log — backend integration will come later
    // eslint-disable-next-line no-console
    console.log('contact form submitted', payload);

    // reset
    this.name.set('');
    this.mail.set('');
    this.phone.set('');
  }
}