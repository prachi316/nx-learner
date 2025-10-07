import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { NAV_ITEMS, SCHOOL_INFO, USER_INFO, VERSION_INFO } from './side-nav.constants';
import { NavItem } from './side-nav.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  imports: [IconComponent],
  templateUrl: './side-nav.component.html',
  standalone: true,
})
export class SideNavComponent {
  @Input() isCollapsed = false;
  @Output() navItemClick = new EventEmitter<string>();
  @Output() toggleCollapse = new EventEmitter<void>();

  // Navigation items
  navItems: NavItem[] = NAV_ITEMS;

  // School information
  schoolInfo = SCHOOL_INFO;

  // User information
  userInfo = USER_INFO;

  // Version information
  version = VERSION_INFO.version;
  copyright = VERSION_INFO.copyright;

  constructor(private router: Router) {}

  onNavItemClick(item: NavItem): void {
    const itemId = item.id;
    this.navItems.forEach((item) => {
      item.active = item.id === itemId;
    });

    // Emit event
    this.navItemClick.emit(itemId);
    this.router.navigate([item.href]);
  }

  onToggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleCollapse.emit();
  }
}
