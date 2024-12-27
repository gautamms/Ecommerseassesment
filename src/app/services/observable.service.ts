import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  constructor() { }

  private imageChange = new Subject<any>();

  changeEmittedImage$ = this.imageChange.asObservable();

  changeImage(): void {
    this.imageChange.next(1);
  }
}
