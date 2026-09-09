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
  selector: 'app-solucoes-marcas-page',
  styleUrl: './solucoes-marcas.page.scss',
  templateUrl: './solucoes-marcas.page.html',
  imports: [ButtonComponent],
})
export class SolutionsForBrandsPage {
  private readonly brandGrowthCarousel = viewChild.required<ElementRef<HTMLElement>>('brandGrowthCarousel');
  private readonly cardsCarousel = viewChild.required<ElementRef<HTMLElement>>('cardsCarousel');
  private readonly eventsCarousel = viewChild.required<ElementRef<HTMLElement>>('eventsCarousel');
  private readonly learningCarousel = viewChild.required<ElementRef<HTMLElement>>('learningCarousel');
  private readonly storiesCarousel = viewChild.required<ElementRef<HTMLElement>>('storiesCarousel');
  private readonly partnerCarousel = viewChild.required<ElementRef<HTMLElement>>('partnerCarousel');

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

  scrollPartner(direction: -1 | 1) {
    this.scrollCarousel(this.partnerCarousel().nativeElement, '.card-partner', direction);
  }

  scrollStories(direction: -1 | 1) {
    this.scrollCarousel(this.storiesCarousel().nativeElement, '.story', direction);
  }

  scrollBrandGrowth(direction: -1 | 1) {
    this.scrollCarousel(this.brandGrowthCarousel().nativeElement, '.brand-growth-image', direction);
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
  site = signal('');
  message = signal('');

  submitForm(event?: Event) {
    event?.preventDefault();

    const payload = {
      name: this.name(),
      mail: this.mail(),
      phone: this.phone(),
      site: this.site(),
      message: this.message(),
    };

    // For now just log — backend integration will come later
    // eslint-disable-next-line no-console
    console.log('contact form submitted', payload);

    // reset
    this.name.set('');
    this.mail.set('');
    this.phone.set('');
    this.site.set('');
    this.message.set('');
  }
}