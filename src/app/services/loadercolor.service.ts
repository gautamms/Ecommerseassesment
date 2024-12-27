import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoadColorService {

  constructor() { }
  private emitSource = new Subject<any>();

  changeEmitted$ = this.emitSource.asObservable();

  changeColor(color: string): void {
    this.emitSource.next(color);
  }
}
