import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetNumberOfDivsService {

  public hierachicalAssociation = new BehaviorSubject<any>({});
  public hierachicalData = new BehaviorSubject<any>({});
  constructor() { }

  incrementDiv(Inputclass) {
  //  this.compClass.next(Inputclass);
    // this.counter.next(this.counter.value + 1);
  //  this.numberOfSubtermAssociationDivs.next(this.numberOfSubtermAssociationDivs.value + 1);
  }
}
