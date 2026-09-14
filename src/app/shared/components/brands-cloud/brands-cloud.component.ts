import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  selector: 'app-brands-cloud-component',
  styleUrl: './brands-cloud.component.scss',
  templateUrl: './brands-cloud.component.html',
})
export class BrandsCloudComponent {}
