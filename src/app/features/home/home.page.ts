import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  styleUrl: './home.page.scss',
  templateUrl: './home.page.html',
  imports: [ButtonComponent],
})
export class HomePage {
  openItems = new Set<number>();

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