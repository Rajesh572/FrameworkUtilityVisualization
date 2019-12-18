import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessIdStorageService {

  public processIdArray = new BehaviorSubject<Array<Object>>([]);
  constructor() { }
  getData() {
    return this.processIdArray.value;
  }
  setData(index, endTime) {
    const temp = this.processIdArray.value;
    temp[index]['endTime'] = endTime ;
this.processIdArray.next(temp);
  }
}
