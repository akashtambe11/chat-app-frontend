import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject('');
  currentData = this.dataSource.asObservable();

  constructor() { }

  sendSiblingData(data) {
    this.dataSource.next(data)
  }
}
