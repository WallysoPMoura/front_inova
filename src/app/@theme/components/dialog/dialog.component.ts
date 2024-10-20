import { DOCUMENT } from '@angular/common';
import { Component, ComponentRef, ElementRef, EventEmitter, HostListener, Inject, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'inova-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  @ViewChild('dialogContainer', { read: ViewContainerRef }) dialogContainer!: ViewContainerRef;

  @Output() close = new EventEmitter();

  @Input() data: any;

  componentType: any;

  componentRef!: ComponentRef<any>;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (event.target.classList.contains('dialog-overlay')) {
      this.close.emit();
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {

    // Fecha o dialogo quando a rota atual for alterada
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => this.close.emit());
  }

  ngOnInit() {
    const body: HTMLBodyElement = this.document.querySelector('body')!;
    body.style.overflow = 'hidden';

    setTimeout(() => {
      this.elementRef.nativeElement.style.opacity = '1';

      if (!this.componentType) return;

      this.componentRef = this.dialogContainer.createComponent(this.componentType, {
        injector: this.viewContainerRef.injector
      });

      this.componentRef.location.nativeElement.style.display = 'block';

      if (this.data) {
        Object.keys(this.data)
          .filter((key: string) => Object.keys(this.componentRef.instance).includes(key))
          .forEach((key: string) => this.componentRef.instance[key] = this.data[key]);
      }
    });
  }

  ngOnDestroy(): void {
    const body: HTMLBodyElement = this.document.querySelector('body')!;
    body.style.overflow = 'auto';
  }

}
