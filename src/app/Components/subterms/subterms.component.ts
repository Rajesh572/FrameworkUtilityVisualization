import { Component, OnInit } from '@angular/core';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';
import { FWCatgReadService } from 'src/app/Services/FWCatgRead/fwcatg-read.service';

@Component({
  selector: 'app-subterms',
  templateUrl: './subterms.component.html',
  styleUrls: ['./subterms.component.scss']
})
export class SubtermsComponent implements OnInit {
  subterms: any;
  fwcode: any;
  catgCode: any;
  selectedIndex: any;

  constructor(public fwTermRead: FWTermsReadService, public fwCatgRead: FWCatgReadService) { }

  ngOnInit() {
    this.fwTermRead.fwTermBody.subscribe((data) => {
      if (data['children']) {
        this.selectedIndex = -1;
        this.subterms = data['children'];
     //   this.readSubTerm(this.subterms[0], 0);
      //  this.readSubTerm( , 0)
      } else {
        this.subterms = [];
      }
    });
    this.fwCatgRead.fwResponse.subscribe((data) => {
      this.fwcode = data.frameworkCode;
      this.catgCode = data.categoryCode;
    });
  }
  readSubTerm(subterm, index) {
    this.selectedIndex = index;
    subterm = ((subterm['identifier']).split('_'))[2];
    this.fwTermRead.readSubTerms(this.fwcode, this.catgCode, subterm).subscribe((data) => {

      this.fwTermRead.fwSubTermBody.next(data['result'].term);

    },
    (error) => {
      console.log('Error in subterms comp', error);
    });
  }
}
