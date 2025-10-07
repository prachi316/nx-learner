import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, SideNavComponent } from '@nx-learner/components';
import { BreadcrumbService } from '../../common/services/breadcrumb.service';
import { BreadcrumbItem } from '@nx-learner/types';
import {
  DEFAULT_BREADCRUMB,
  DEFAULT_PAGE_TITLE,
  NAVIGATION_BREADCRUMB_MAP,
  DEFAULT_NAVIGATION_CONFIG,
} from './landing.constants';

@Component({
  selector: 'app-landing',
  imports: [SideNavComponent, HeaderComponent, RouterOutlet],
  templateUrl: './landing.component.html',
  standalone: true,
})
export class LandingComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    // Set intelligent breadcrumbs for landing page
    this.breadcrumbService.setPageBreadcrumbs('');
  }

  isSideNavCollapsed = false;

  // Breadcrumb configuration (for backward compatibility)
  breadcrumbItems: BreadcrumbItem[] = DEFAULT_BREADCRUMB;
  pageTitle = DEFAULT_PAGE_TITLE;

  onNavItemClick(itemId: string): void {
    console.log('Navigation clicked:', itemId);
    // Handle navigation logic here
    this.updateBreadcrumb(itemId);
  }

  onToggleCollapse(): void {
    this.isSideNavCollapsed = !this.isSideNavCollapsed;
  }

  private updateBreadcrumb(itemId: string): void {
    // Update breadcrumb based on navigation item
    const config = NAVIGATION_BREADCRUMB_MAP[itemId] || DEFAULT_NAVIGATION_CONFIG;
    this.breadcrumbItems = config.breadcrumb;
    this.pageTitle = config.title;
  }
}
