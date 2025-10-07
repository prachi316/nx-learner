import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { BreadcrumbItem } from './breadcrumb.types';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './breadcrumb.component.html',
  standalone: true,
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  @Input() items: BreadcrumbItem[] = [];
  @Input() separator: string = '/';
  @Input() showHome: boolean = true;
  @Input() useService: boolean = true; // Flag to use intelligent service or input

  breadcrumbItems: BreadcrumbItem[] = [];
  private subscription?: Subscription;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    if (this.useService) {
      // Subscribe to intelligent breadcrumb service
      this.subscription = this.breadcrumbService.breadcrumb$.subscribe((items) => {
        this.breadcrumbItems = this.processBreadcrumbItems(items);
      });
    } else {
      // Use input items (fallback mode)
      this.breadcrumbItems = this.processBreadcrumbItems(this.items);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private processBreadcrumbItems(items: BreadcrumbItem[]): BreadcrumbItem[] {
    const processedItems = [...items];

    if (this.showHome && processedItems.length > 0) {
      // Only add home if it's not already present
      const hasHome = processedItems.some((item) => item.id === 'home' || item.label === 'Home');
      if (!hasHome) {
        processedItems.unshift({ id: 'home', label: 'Home', url: '/', active: false });
      }
    }

    // Mark the last item as active
    if (processedItems.length > 0) {
      processedItems[processedItems.length - 1].active = true;
    }

    return processedItems;
  }
}
