import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-time-input',
  standalone: true,
  styles: [
    `
      /* Hide the default time picker indicator */
      :host input[type='time']::-webkit-calendar-picker-indicator {
        opacity: 0;
        display: block;
        position: absolute;
        right: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      /* Add a custom icon using a pseudo-element */
      :host input[type='time']:before {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="%236B7280" viewBox="0 0 24 24"><path d="M16.1094 9C16.1094 7.11448 15.3604 5.30618 14.0271 3.97291C12.6938 2.63965 10.8855 1.89062 9 1.89062C7.11448 1.89062 5.30618 2.63965 3.97291 3.97291C2.63965 5.30618 1.89062 7.11448 1.89062 9C1.89062 10.8855 2.63965 12.6938 3.97291 14.0271C5.30618 15.3604 7.11448 16.1094 9 16.1094C10.8855 16.1094 12.6938 15.3604 14.0271 14.0271C15.3604 12.6938 16.1094 10.8855 16.1094 9ZM0.25 9C0.25 6.67936 1.17187 4.45376 2.81282 2.81282C4.45376 1.17187 6.67936 0.25 9 0.25C11.3206 0.25 13.5462 1.17187 15.1872 2.81282C16.8281 4.45376 17.75 6.67936 17.75 9C17.75 11.3206 16.8281 13.5462 15.1872 15.1872C13.5462 16.8281 11.3206 17.75 9 17.75C6.67936 17.75 4.45376 16.8281 2.81282 15.1872C1.17187 13.5462 0.25 11.3206 0.25 9ZM9.82031 4.35156V9C9.82031 9.27344 9.68359 9.52979 9.45459 9.68359L6.17334 11.8711C5.79736 12.124 5.28809 12.0215 5.03516 11.6421C4.78223 11.2627 4.88477 10.7568 5.26416 10.5039L8.17969 8.5625V4.35156C8.17969 3.89697 8.54541 3.53125 9 3.53125C9.45459 3.53125 9.82031 3.89697 9.82031 4.35156Z"/></svg>');
        position: absolute;
        right: 10px;
        top: 60%;
        transform: translateY(-50%);
        pointer-events: none;
        z-index: 1;
      }
    `,
  ],
  template: `
    <div class="relative">
      <input
        type="time"
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
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true,
    },
  ],
})
export class TimeInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Select time';
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
