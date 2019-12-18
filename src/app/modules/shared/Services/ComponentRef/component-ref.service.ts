import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentRefService {

  public ref = new BehaviorSubject<any>({});
  constructor() { }
}
