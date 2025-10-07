import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { BadgeItem, BadgeConfig } from '../badge/badge.types';
import { DEFAULT_BADGE_CONFIG } from '../badge/badge.constants';

@Component({
  selector: 'app-badge-group',
  imports: [BadgeComponent],
  templateUrl: './badge-group.component.html',
  standalone: true,
})
export class BadgeGroupComponent {
  @Input() badges: BadgeItem[] = [];
  @Input() config: BadgeConfig = DEFAULT_BADGE_CONFIG;
  @Input() allowMultipleSelection = false;
  @Output() badgeClick = new EventEmitter<BadgeItem>();
  @Output() badgeRemove = new EventEmitter<BadgeItem>();

  onBadgeClick(badge: BadgeItem): void {
    if (badge.disabled) return;

    // Handle selection logic
    if (this.allowMultipleSelection) {
      // Toggle selection for multiple selection
      badge.active = !badge.active;
    } else {
      // Single selection - deactivate all others
      this.badges.forEach((b) => (b.active = false));
      badge.active = true;
    }

    this.badgeClick.emit(badge);
  }

  onBadgeRemove(badge: BadgeItem): void {
    this.badgeRemove.emit(badge);
  }

  getContainerClasses(): string {
    return 'flex flex-wrap gap-2';
  }
}
