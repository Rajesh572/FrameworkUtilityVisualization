import { Component, OnInit } from '@angular/core';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.scss']
})
export class AssociationsComponent implements OnInit {
  associatedTerms: any;
  categorycode: any;

  constructor(public fwTermRead: FWTermsReadService) { }

  ngOnInit() {
    this.fwTermRead.fwTermBody.subscribe((data) => {
      if (data['associations']) {
       /*  this.categorycode = data['identifier'];
        this.categorycode = this.categorycode.split('_');
        this.categorycode = this.categorycode;
        */
        this.associatedTerms = data['associations'];
        for ( let i = 0; i < this.associatedTerms.length; i++) {
          this.categorycode = this.associatedTerms[i]['identifier'];
          this.categorycode = this.categorycode.split('_');
          this.associatedTerms[i]['category'] = this.categorycode[1];
        }
      } else {
        this.associatedTerms = [];
      }
    });
  }

}
