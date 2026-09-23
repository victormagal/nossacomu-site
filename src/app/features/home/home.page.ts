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
  private readonly historyStepper = viewChild.required<ElementRef<HTMLElement>>('historyStepper');
  private historyTimer?: ReturnType<typeof setInterval>;
  private historyObserver?: IntersectionObserver;

  openItems = new Set<number>();
  protected readonly activeHistoryStep = signal(0);
  protected readonly historyProgressAlternate = signal(false);

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
}
