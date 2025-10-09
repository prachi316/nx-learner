import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="relative">
      <input
        type="text"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [class]="inputClasses"
        [class.border-red-500]="hasError"
        [class.border-gray-300]="!hasError"
      />
      @if (icon) {
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <app-icon
            [theIcon]="icon"
            width="20"
            height="20"
            color="#6B7280"
            class="text-gray-400"
          ></app-icon>
        </div>
      }
    </div>
    @if (hasError && errorMessage) {
      <div class="text-red-500 text-sm mt-1">{{ errorMessage }}</div>
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() hasError: boolean = false;
  @Input() errorMessage: string = '';
  @Input() icon: string = '';
  @Input() inputClasses: string =
    'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

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
