import { Component, Input } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from '../breadcrumb/breadcrumb.types';

@Component({
  selector: 'app-header',
  imports: [BreadcrumbComponent],
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {
  @Input() breadcrumbItems: BreadcrumbItem[] = [
    { id: 'dashboard', label: 'Dashboard', url: '/dashboard', active: true },
  ];
  @Input() pageTitle: string = 'Dashboard';
}
