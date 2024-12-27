import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private subjectName = new Subject<any>();
  constructor(private http: HttpClient,
    private dataService: DataService,) {
  }

  sendUpdate(data: any) { //the component that wants to update something, calls this fn
    this.subjectName.next(data); //next() will feed the value in Subject
  }

  getUpdate(): Observable<any> { //the receiver component calls this function 
    return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

}
