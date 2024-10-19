import { ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { LoadingComponent } from '../../@theme/modals/loading/loading.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  componentRef!: ComponentRef<LoadingComponent>

  constructor(private viewContainerRef: ViewContainerRef, private injector: Injector, private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => this.hide());
  }

  show() {
    const injector = Injector.create({ providers: [], parent: this.injector });
    this.componentRef = this.viewContainerRef.createComponent(LoadingComponent, { injector: injector });
  }

  hide() {
    if (!this.componentRef) return;

    this.componentRef.location.nativeElement.style.opacity = '0';

    setTimeout(() => {
      if (!this.componentRef) return;
      this.componentRef.destroy();
    }, 500);
  }

}
