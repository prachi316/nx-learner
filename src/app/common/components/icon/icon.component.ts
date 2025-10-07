import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.component.html',
  standalone: true,
})
export class IconComponent {
  theIcon = input.required<string>();
  color = input<string>();
  width = input<string>('20');
  height = input<string>('20');
}
