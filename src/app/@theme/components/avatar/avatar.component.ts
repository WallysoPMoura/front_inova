import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { AvatarItem } from '../../../@core/types/avatar.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'inova-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {

  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('avatar') avatar!: ElementRef;

  @Input() label!: string;
  @Input() items?: AvatarItem[];

  @Output() onSelect = new EventEmitter<AvatarItem>();


  @HostListener('document:click', ['$event'])
  @HostListener('document:scroll', ['$event'])
  clickout(event: { target: any; }): void {
    if (this.dropdown?.nativeElement.classList.contains('expanded') && !this.elementRef.nativeElement.contains(event.target)) {

      const content = this.dropdown.nativeElement;
      const avatar = this.avatar.nativeElement;

      content.style.maxHeight = '0px';
      content.classList.remove('expanded');
      avatar.classList.remove('expanded');

    }
  }

  constructor(private elementRef: ElementRef) { }

  get avatarIcon(): string {
    const name = this.label?.replace(' ', '+');
    return `https://ui-avatars.com/api/name=${name}?rounded=true&background=ef892a&color=fff`;
  }


  toggle(): void {

    const item = this.dropdown.nativeElement;

    this.avatar.nativeElement.classList.toggle('expanded');

    if (item.classList.contains('expanded')) {
      item.style.maxHeight = '0px';
      item.classList.remove('expanded');
    } else {
      item.style.maxHeight = (item.scrollHeight + 10) + 'px';
      item.classList.add('expanded');
    }

  }

  select(item: AvatarItem): void {
    if (item.disabled) {
      return;
    }

    const dropdown = this.dropdown.nativeElement;
    const avatar = this.avatar.nativeElement;

    dropdown.style.maxHeight = '0px';
    dropdown.classList.remove('expanded');
    avatar.classList.remove('expanded');

    this.onSelect.emit(item)
  }

}
