import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent
    ],
    selector: 'app-main-layout',
    standalone: true,
    styleUrl: './main.layout.scss',
    templateUrl: './main.layout.html',
})
export class MainLayout {}
