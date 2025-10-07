import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TabItem, TabConfig } from './tabs.types';
import { DEFAULT_TAB_CONFIG } from './tabs.constants';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.component.html',
  standalone: true,
})
export class TabsComponent implements OnInit {
  @Input() tabs: TabItem[] = [];
  @Input() config: TabConfig = DEFAULT_TAB_CONFIG;
  @Output() tabChange = new EventEmitter<TabItem>();

  activeTab: TabItem | null = null;

  ngOnInit(): void {
    // Set the first active tab if none is specified
    if (this.tabs.length > 0) {
      const activeTab = this.tabs.find((tab) => tab.active);
      this.activeTab = activeTab || this.tabs[0];
    }
  }

  onTabClick(tab: TabItem): void {
    if (tab.disabled) return;

    // Update active state
    this.tabs.forEach((t) => (t.active = false));
    tab.active = true;
    this.activeTab = tab;

    // Emit change event
    this.tabChange.emit(tab);
  }

  getTabClasses(tab: TabItem): string {
    const baseClasses =
      'px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center';
    const sizeClasses = this.getSizeClasses();
    const variantClasses = this.getVariantClasses(tab);
    const stateClasses = tab.disabled ? 'opacity-50' : '';

    return `${baseClasses} ${sizeClasses} ${variantClasses} ${stateClasses}`.trim();
  }

  getContainerClasses(): string {
    const baseClasses = 'flex';
    const widthClasses = this.config.fullWidth ? 'w-full' : '';
    const centerClasses = this.config.centered ? 'justify-center' : '';
    const variantClasses = this.getContainerVariantClasses();
    const spacingClasses = this.config.variant === 'pills' ? 'gap-1' : 'gap-3';

    return `${baseClasses} ${widthClasses} ${centerClasses} ${variantClasses} ${spacingClasses}`.trim();
  }

  private getSizeClasses(): string {
    switch (this.config.size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  }

  private getVariantClasses(tab: TabItem): string {
    if (tab.active) {
      switch (this.config.variant) {
        case 'pills':
          return 'bg-yellow-400 text-gray-900';
        case 'underline':
          return 'text-blue-600 border-b-2 border-blue-600 bg-transparent';
        default:
          return 'bg-blue-600 text-white';
      }
    } else {
      switch (this.config.variant) {
        case 'pills':
          return 'text-gray-700 hover:bg-gray-100';
        case 'underline':
          return 'text-gray-500 hover:text-gray-700 hover:bg-gray-50';
        default:
          return 'text-gray-600 hover:bg-gray-100';
      }
    }
  }

  private getContainerVariantClasses(): string {
    switch (this.config.variant) {
      case 'pills':
        return 'bg-yellow-50 border border-yellow-200 rounded-lg p-1';
      case 'underline':
        return 'border-b border-gray-200';
      default:
        return '';
    }
  }

  getTabWidth(): string {
    if (this.tabs.length === 0) return '100%';

    // Calculate equal width for each tab
    const tabCount = this.tabs.length;
    const percentage = 100 / tabCount;

    // For pills variant, account for container padding
    if (this.config.variant === 'pills') {
      return `calc(${percentage}% - 0.25rem)`;
    }

    return `${percentage}%`;
  }
}
