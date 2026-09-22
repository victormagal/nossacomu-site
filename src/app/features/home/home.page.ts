import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { BrandsCloudComponent } from '../../shared/components/brands-cloud/brands-cloud.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home-page',
  styleUrl: './home.page.scss',
  templateUrl: './home.page.html',
  imports: [BrandsCloudComponent, ButtonComponent],
})
export class HomePage implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly brandGrowthCarousel =
    viewChild.required<ElementRef<HTMLElement>>('brandGrowthCarousel');
  private readonly eventsCarousel = viewChild.required<ElementRef<HTMLElement>>('eventsCarousel');
  private readonly storiesCarousel = viewChild.required<ElementRef<HTMLElement>>('storiesCarousel');
  private readonly historyStepper = viewChild.required<ElementRef<HTMLElement>>('historyStepper');
  private historyTimer?: ReturnType<typeof setInterval>;
  private historyObserver?: IntersectionObserver;

  openItems = new Set<number>();
  protected readonly activeHistoryStep = signal(0);
  protected readonly historyProgressAlternate = signal(false);

  scrollBrandGrowth(direction: -1 | 1) {
    this.scrollCarousel(this.brandGrowthCarousel().nativeElement, '.brand-growth-image', direction);
  }

  scrollEvents(direction: -1 | 1) {
    this.scrollCarousel(this.eventsCarousel().nativeElement, '.card-event', direction);
  }

  scrollStories(direction: -1 | 1) {
    this.scrollCarousel(this.storiesCarousel().nativeElement, '.story', direction);
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.historyObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.startHistoryAutoplay();
        } else {
          this.stopHistoryAutoplay();
        }
      },
      { threshold: 0.3 },
    );
    this.historyObserver.observe(this.historyStepper().nativeElement);
  }

  ngOnDestroy() {
    this.stopHistoryAutoplay();
    this.historyObserver?.disconnect();
  }

  protected selectHistoryStep(index: number) {
    this.activeHistoryStep.set(index);
    this.historyProgressAlternate.update((alternate) => !alternate);
    this.startHistoryAutoplay();
  }

  private startHistoryAutoplay() {
    this.stopHistoryAutoplay();
    this.historyTimer = setInterval(() => {
      this.selectHistoryStep((this.activeHistoryStep() + 1) % 3);
    }, 4000);
  }

  private stopHistoryAutoplay() {
    if (this.historyTimer) {
      clearInterval(this.historyTimer);
      this.historyTimer = undefined;
    }
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
