import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetLoaderService {
  public setLoaderFlag = new BehaviorSubject<any>(false);
  setLoaderFlag$ = this.setLoaderFlag.asObservable();

  constructor() { }
}
