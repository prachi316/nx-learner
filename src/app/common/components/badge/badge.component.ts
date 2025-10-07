import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BadgeItem, BadgeConfig } from './badge.types';
import { DEFAULT_BADGE_CONFIG } from './badge.constants';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  standalone: true,
})
export class BadgeComponent {
  @Input() badge: BadgeItem = { id: '', label: '' };
  @Input() config: BadgeConfig = DEFAULT_BADGE_CONFIG;
  @Output() badgeClick = new EventEmitter<BadgeItem>();
  @Output() badgeRemove = new EventEmitter<BadgeItem>();

  onBadgeClick(): void {
    if (this.badge.disabled || !this.config.clickable) return;
    this.badgeClick.emit(this.badge);
  }

  onRemoveClick(event: Event): void {
    event.stopPropagation();
    if (this.badge.disabled) return;
    this.badgeRemove.emit(this.badge);
  }

  getBadgeClasses(): string {
    const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors';
    const sizeClasses = this.getSizeClasses();
    const variantClasses = this.getVariantClasses();
    const stateClasses = this.getStateClasses();
    const cursorClasses = this.getCursorClasses();

    return `${baseClasses} ${sizeClasses} ${variantClasses} ${stateClasses} ${cursorClasses}`.trim();
  }

  private getSizeClasses(): string {
    switch (this.config.size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  }

  private getVariantClasses(): string {
    const colorClasses = this.getColorClasses();

    switch (this.config.variant) {
      case 'solid':
        return `${colorClasses.background} ${colorClasses.text}`;
      case 'outline':
        return `border ${colorClasses.border} ${colorClasses.text} ${colorClasses.hover}`;
      case 'ghost':
        return `${colorClasses.background} ${colorClasses.text} ${colorClasses.hover}`;
      default:
        return `bg-gray-100 text-gray-800 hover:bg-gray-200`;
    }
  }

  private getColorClasses(): { background: string; text: string; border: string; hover: string } {
    const color = this.config.color || 'gray';

    const colorMap = {
      gray: {
        background: 'bg-gray-100',
        text: 'text-gray-800',
        border: 'border-gray-300',
        hover: 'hover:bg-gray-200',
      },
      blue: {
        background: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300',
        hover: 'hover:bg-blue-200',
      },
      green: {
        background: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300',
        hover: 'hover:bg-green-200',
      },
      yellow: {
        background: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-300',
        hover: 'hover:bg-yellow-200',
      },
      red: {
        background: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-300',
        hover: 'hover:bg-red-200',
      },
      purple: {
        background: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-300',
        hover: 'hover:bg-purple-200',
      },
      indigo: {
        background: 'bg-indigo-100',
        text: 'text-indigo-800',
        border: 'border-indigo-300',
        hover: 'hover:bg-indigo-200',
      },
      pink: {
        background: 'bg-pink-100',
        text: 'text-pink-800',
        border: 'border-pink-300',
        hover: 'hover:bg-pink-200',
      },
    };

    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  }

  private getStateClasses(): string {
    if (this.badge.active) {
      return 'ring-2 ring-offset-1 ring-blue-500';
    }
    return '';
  }

  private getCursorClasses(): string {
    if (this.badge.disabled) {
      return 'cursor-not-allowed opacity-50';
    }
    if (this.config.clickable) {
      return 'cursor-pointer';
    }
    return '';
  }
}
