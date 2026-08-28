import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: 'app-footer',
    standalone: true,
    styleUrl: './footer.component.scss',
    templateUrl: './footer.component.html',
    imports: [ButtonComponent],
})
export class FooterComponent {}
