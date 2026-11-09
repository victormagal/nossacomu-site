import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface ToastMessage {
  kind: 'success' | 'error';
  title: string;
  message: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toast',
  styleUrl: './toast.component.scss',
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  readonly message = input<ToastMessage | null>(null);
  readonly dismissed = output<void>();
}
