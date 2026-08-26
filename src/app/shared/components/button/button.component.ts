import { Component, input } from '@angular/core';

type Variant = 'default' | 'pink' | 'rainbow';

@Component({
    selector: 'app-button',
    standalone: true,
    styleUrl: './button.component.scss',
    templateUrl: './button.component.html',
})
export class ButtonComponent {
    link = input<string | null>(null);
    text = input<string>('');
    type = input<Variant>('default');
}
