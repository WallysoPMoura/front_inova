import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogRef {

  private closeSubject = new Subject<any>();

  private closed = false;

  get onClose() {
    return this.closeSubject.asObservable();
  }

  close(result?: any) {
    if (!this.closed) {
      this.closed = true;
      this.closeSubject.next(result);
      this.closeSubject.complete();
    }
  }

}