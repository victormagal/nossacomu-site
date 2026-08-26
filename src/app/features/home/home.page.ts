import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  styleUrl: './home.page.scss',
  templateUrl: './home.page.html',
  imports: [ButtonComponent],
})
export class HomePage {}