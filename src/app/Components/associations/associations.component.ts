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
        this.categorycode = data['category'];
        this.associatedTerms = data['associations'];
      } else {
        this.associatedTerms = [];
      }
    });
  }

}
