import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'inova-checkbox',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    }
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements ControlValueAccessor {

  @Input('checked') _checked: boolean = false;

  @Input('disabled') set disabled(value: boolean) {
    this._disabled = value;
    if (this._disabled) {
      this._checked = false;
    }
  }

  @Input('label') label: string = '';

  @Output('change') change = new EventEmitter();

  // private _checked: boolean = false;
  private _disabled: boolean = false;

  changed: any = () => { };
  onTouched: any = () => { };

  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    this._checked = value;
  }

  writeValue(value: boolean): void {
    this._checked = value;
  }

  onChange(): void {

    if (this.disabled) {
      return;
    }

    this._checked = !this._checked;

    this.changed(this._checked);
    this.change.emit(this._checked);
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this._disabled = disabled;
  }

  get disabled(): boolean | null | undefined {
    return this._disabled;
  }

}
