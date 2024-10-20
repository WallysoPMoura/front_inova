import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: '[inovaButton]',
  standalone: true,
  imports: [],
  template: '<ng-content />',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() status: 'default' | 'outline' = 'default';

  @HostBinding('class') get classes(): string {
    return `${this.status}`;
  }

}
