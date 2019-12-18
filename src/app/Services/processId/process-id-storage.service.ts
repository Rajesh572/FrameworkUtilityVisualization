import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessIdStorageService {

  public processIdArray = new BehaviorSubject<Array<Object>>([]);
  constructor() { }
}
