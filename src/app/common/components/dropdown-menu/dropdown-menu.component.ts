import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: string;
  action: string;
  disabled?: boolean;
  danger?: boolean;
}

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative" #dropdownTrigger>
      <!-- Trigger Button -->
      <button
        type="button"
        (click)="toggleMenu()"
        class="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
        [attr.aria-expanded]="isOpen"
        aria-haspopup="true"
      >
        <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
          />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      @if (isOpen) {
        <div
          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
          [class]="menuClass"
        >
          @for (item of items; track item.id) {
            <button
              type="button"
              (click)="onItemClick(item)"
              [disabled]="item.disabled"
              class="w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-3"
              [class.text-gray-700]="!item.disabled && !item.danger"
              [class.text-red-600]="item.danger && !item.disabled"
              [class.text-gray-400]="item.disabled"
              [class.hover:bg-gray-100]="!item.disabled"
              [class.cursor-not-allowed]="item.disabled"
              [class.cursor-pointer]="!item.disabled"
            >
              @if (item.icon) {
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path [attr.d]="getIconPath(item.icon)" />
                </svg>
              }
              {{ item.label }}
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class DropdownMenuComponent {
  @Input() items: DropdownMenuItem[] = [];
  @Input() menuClass: string = '';
  @Output() itemClick = new EventEmitter<DropdownMenuItem>();

  isOpen = false;

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  onItemClick(item: DropdownMenuItem): void {
    if (!item.disabled) {
      this.itemClick.emit(item);
      this.isOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isOpen = false;
    }
  }

  getIconPath(icon: string): string {
    const iconPaths: { [key: string]: string } = {
      open: 'M10 12a2 2 0 100-4 2 2 0 000 4zM3.05 11a7 7 0 1113.9 0H3.05zM18 11a7 7 0 11-14 0h14z',
      edit: 'M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z',
      delete:
        'M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM8 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z',
      todo: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      done: 'M5 13l4 4L19 7',
    };
    return iconPaths[icon] || '';
  }
}
