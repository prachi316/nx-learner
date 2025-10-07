import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, IconComponent],
  templateUrl: './modal.component.html',
  standalone: true,
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Modal';
  @Input() closeOnBackdropClick = false;
  @Input() showCloseButton = true;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget && this.closeOnBackdropClick) {
      this.onClose();
    }
  }
}
