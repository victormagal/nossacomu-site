import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(document:keydown.escape)': 'closeMenu()',
    },
    imports: [NgOptimizedImage],
    selector: 'app-header',
    styleUrl: './header.component.scss',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    protected readonly menuOpen = signal(false);

    protected toggleMenu() {
        this.menuOpen.update((isOpen) => !isOpen);
    }

    protected closeMenu() {
        this.menuOpen.set(false);
    }
}
