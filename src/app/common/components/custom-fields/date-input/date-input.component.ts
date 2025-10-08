import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  standalone: true,
  styles: [
    `
      /* Hide the default calendar picker indicator */
      :host input[type='date']::-webkit-calendar-picker-indicator {
        opacity: 0;
        display: block;
        position: absolute;
        right: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      /* Add a custom icon using a pseudo-element */
      :host input[type='date']:before {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="%236B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/></svg>');
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        z-index: 1;
      }
    `,
  ],
  template: `
    <div class="relative">
      <input
        type="date"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [class]="inputClasses"
        [class.border-red-500]="hasError"
        [class.border-gray-300]="!hasError"
      />
    </div>
    @if (hasError && errorMessage) {
      <div class="text-red-500 text-sm mt-1">{{ errorMessage }}</div>
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Select date';
  @Input() disabled: boolean = false;
  @Input() hasError: boolean = false;
  @Input() errorMessage: string = '';
  @Input() inputClasses: string =
    'w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
