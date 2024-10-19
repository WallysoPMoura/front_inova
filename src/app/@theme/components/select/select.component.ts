import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { SelectItem } from '../../../@core/types/select.type';

@Component({
  selector: 'inova-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  @ViewChild('select') select!: ElementRef;

  @Input() items: SelectItem[] = [];
  @Input() placeholder: string = 'Selecione';
  @Input() disabled: boolean = false;
  @Input() value?: any;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  expanded: boolean = false;

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  @HostListener('document:scroll', ['$event'])
  clickout(event: { target: any; }): void {
    if (this.select?.nativeElement.classList.contains('expanded') && !this.elementRef.nativeElement.contains(event.target)) {
      this.expanded = false;

      const content = this.select.nativeElement;

      content.style.maxHeight = '0px';
      content.classList.remove('expanded');
    }
  }

  get valueOrPlaceholder(): string | undefined {
    return this.value != null ? this.items.find(item => item.value == this.value)?.label : (this.placeholder ?? '&nbsp;');
  }

  expand(): void {
    const content = this.select.nativeElement;
    const isExpanded = content.classList.contains('expanded');

    if (this.disabled) return;

    if (isExpanded) {
      content.style.maxHeight = '0px';
      content.classList.remove('expanded');
    } else {
      content.style.maxHeight = (content.scrollHeight + 10) + 'px';
      content.classList.add('expanded');
    }

    this.expanded = !this.expanded;
  }

  change(value: any): void {

    if (this.disabled) {
      return;
    }

    const content = this.select.nativeElement;

    this.expanded = false;

    content.style.maxHeight = '0px';
    content.classList.remove('expanded');

    this.value = value;
    this.onChange.emit(this.value)

  }

}
