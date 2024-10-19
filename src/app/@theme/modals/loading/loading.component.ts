import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'inova-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef
  ) { }
  
  ngOnInit(): void {
    const body: HTMLBodyElement = this.document.querySelector('body')!;
    body.style.overflow = 'hidden';
    
    setTimeout(() => this.elementRef.nativeElement.style.opacity = '1');
  }

  ngOnDestroy(): void {
    const body: HTMLBodyElement = this.document.querySelector('body')!;
    body.style.overflow = 'auto';
  }

 }
