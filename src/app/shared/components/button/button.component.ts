import { Component, input } from '@angular/core';

type Size = 'small' | 'medium' | 'large';
type Variant = 'blue' | 'dark-rainbow' | 'default' | 'pink' | 'rainbow' | 'transparentMuted' | 'transparentWhite';

@Component({
    selector: 'app-button',
    standalone: true,
    styleUrl: './button.component.scss',
    templateUrl: './button.component.html',
})
export class ButtonComponent {
    link = input<string | null>(null);
    size = input<Size>('medium');
    text = input<string>('');
    type = input<Variant>('default');
}
