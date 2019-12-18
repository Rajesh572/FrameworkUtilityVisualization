import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ComponentRef, ViewChild, OnDestroy } from '@angular/core';
import { SubtermsassociationComponent } from '../subtermsassociation/subtermsassociation.component';
import { FWTermsReadService } from 'src/app/modules/shared/Services/FWTermsRead/fwterms-read.service';
import { FWCatgReadService } from 'src/app/modules/shared/Services/FWCatgRead/fwcatg-read.service';
import { SetNumberOfDivsService } from 'src/app/modules/shared/Services/SetNumberOfDivs/set-number-of-divs.service';
import { ComponentRefService } from 'src/app/modules/shared/Services/ComponentRef/component-ref.service';
import { DeleteDataService } from '../../Services/deleteData/delete-data.service';
import { SetLoaderService } from 'src/app/modules/shared/Services/setLoader/set-loader.service';

@Component({
  selector: 'app-subterms',
  templateUrl: './subterms.component.html',
  styleUrls: ['./subterms.component.scss']
})
export class SubtermsComponent implements OnInit, OnDestroy {
  fwcode: any;
  catgCode: any;
  selectedIndex = -1;
  currentIndex = 0;
  isSingleClick = true;
  time: any;
  reqArray = [];
  @Input() subterms: any;
  @Output() deleteItem = new EventEmitter();
  reference: any;
  public subtermshierachicalData = [];
  counter: any;
  constructor(public fwTermRead: FWTermsReadService, public fwCatgRead: FWCatgReadService,
    public subtermsdivs: SetNumberOfDivsService, public compRef: ComponentRefService,
    public componentFactoryResolver: ComponentFactoryResolver, public todeleteData: DeleteDataService,
    public setLoader: SetLoaderService) { }

  ngOnInit() {
    console.log('Subterm Array', this.subterms);
    this.fwCatgRead.fwResponse.subscribe((data) => {
      this.fwcode = data.frameworkCode;
      this.catgCode = data.categoryCode;
    });
  }
  readSubTerm(subterm, index) {
    this.compRef.ref.next({ comp: this.reference });
    this.selectedIndex = index;
    subterm = ((subterm['identifier']).split('_'))[2];
    const req = this.fwTermRead.readSubTerms(this.fwcode, this.catgCode, subterm).subscribe((data) => {
      if (data['result'].term['children'] && data['result'].term['children'].length > 0) {
        this.subtermsdivs.hierachicalData.next({ comp: SubtermsComponent, childData: data['result'].term['children'] });
      }
      if (data['result'].term['associations'] && data['result'].term['associations'].length > 0) {
        this.subtermsdivs.hierachicalAssociation.next({
          parentcomp: SubtermsComponent, comp: SubtermsassociationComponent,
          associatedData: data['result'].term['associations'], index: this.currentIndex
        });
      }
      this.reqArray.push(req);

    },
      (error) => {
        console.log('Error in subterms comp', error);
        this.reqArray.push(req);

      });
  }
  dragEnd(event, item) {
    console.log('event', event, item);
    this.todeleteData.data.next({ type: 'subterm', item: item });
  }
  ngOnDestroy() {
    this.reqArray.forEach((item) => {
      item.unsubscribe();
    });
  }
}
