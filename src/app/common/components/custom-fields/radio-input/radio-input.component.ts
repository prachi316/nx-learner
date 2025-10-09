import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-input',
  template: `
    <div class="flex gap-4">
      @for (option of options; track option.value) {
        <label class="flex items-center cursor-pointer">
          <input
            type="radio"
            [name]="name"
            [value]="option.value"
            [checked]="value === option.value"
            (change)="onChange(option.value)"
            (blur)="onTouched()"
            [disabled]="disabled"
            class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-400 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span class="ml-2 text-sm text-gray-700" [class.text-gray-400]="disabled">
            {{ option.label }}
          </span>
        </label>
      }
    </div>
    @if (hasError) {
      <div class="text-red-500 text-sm mt-1">{{ errorMessage }}</div>
    }
  `,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioInputComponent),
      multi: true,
    },
  ],
})
export class RadioInputComponent implements ControlValueAccessor {
  @Input() name: string = '';
  @Input() options: RadioOption[] = [];
  @Input() hasError: boolean = false;
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;

  value: any = null;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

export interface RadioOption {
  value: any;
  label: string;
}
