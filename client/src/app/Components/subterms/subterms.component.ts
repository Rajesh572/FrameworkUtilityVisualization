import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';
import { FWCatgReadService } from 'src/app/Services/FWCatgRead/fwcatg-read.service';
import { SetNumberOfDivsService } from 'src/app/Services/SetNumberOfDivs/set-number-of-divs.service';
import { SubtermsassociationComponent } from '../subtermsassociation/subtermsassociation.component';
import { ComponentRefService } from 'src/app/Services/ComponentRef/component-ref.service';

@Component({
  selector: 'app-subterms',
  templateUrl: './subterms.component.html',
  styleUrls: ['./subterms.component.scss']
})
export class SubtermsComponent implements OnInit {
  fwcode: any;
  catgCode: any;
  selectedIndex = -1;
  currentIndex = 0 ;
  @ViewChild(SubtermsComponent) compreference: ComponentRef<any>;
 @Input() subterms: any;
 @Output() someEvent = new EventEmitter<string>();
 reference: any;
 public subtermshierachicalData = [];
  counter: any;
  constructor(public fwTermRead: FWTermsReadService, public fwCatgRead: FWCatgReadService,
    public subtermsdivs: SetNumberOfDivsService, public compRef: ComponentRefService,
    public componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    console.log('Refernce-1', this.reference );
    this.fwCatgRead.fwResponse.subscribe((data) => {
      this.fwcode = data.frameworkCode;
      this.catgCode = data.categoryCode;
    });
  }
  readSubTerm(subterm, index) {
   this.compRef.ref.next({comp: this.reference});
    this.selectedIndex = index;
    subterm = ((subterm['identifier']).split('_'))[2];
    this.fwTermRead.readSubTerms(this.fwcode, this.catgCode, subterm).subscribe((data) => {

      if (data['result'].term['children'] && data['result'].term['children'].length > 0) {
        this.subtermsdivs.hierachicalData.next({comp: SubtermsComponent, childData: data['result'].term['children']});

      }
      if (data['result'].term['associations'] && data['result'].term['associations'].length > 0) {

          this.subtermsdivs.hierachicalAssociation.next({parentcomp: SubtermsComponent, comp: SubtermsassociationComponent,
            associatedData: data['result'].term['associations']});
      }
    },
    (error) => {
      console.log('Error in subterms comp', error);
    });
  }
}
