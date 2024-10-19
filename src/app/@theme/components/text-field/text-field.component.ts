import { Component, EventEmitter, forwardRef, Input, Optional, Output } from '@angular/core';
import { InputType, SupportText } from '../../../@core/types/input.type';
import { CommonModule } from '@angular/common';
import { ControlContainer, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'inova-text-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    }
  ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextFieldComponent implements ControlValueAccessor {

  @Input() type: InputType = 'text';
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() supportText?: SupportText;
  @Input() formControlName?: string;
  @Input() disabled: boolean = false;
  @Input() value?: any;

  @Input() icon?: string;

  @Output() valueChange = new EventEmitter<any>();

  changed: any = () => { };
  onTouched: any = () => { };

  constructor(@Optional() private controlContainer: ControlContainer) {}

  change(field: any): void {

    if (this.disabled) {
      return;
    }

    this.valueChange.emit(field.value);
    this.changed(field.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) || false;
  }

  get control() {
    return this.controlContainer?.control?.get(this.formControlName || '');
  }

}
