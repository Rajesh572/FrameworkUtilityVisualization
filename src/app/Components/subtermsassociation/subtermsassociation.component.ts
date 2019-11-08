import { Component, OnInit } from '@angular/core';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';

@Component({
  selector: 'app-subtermsassociation',
  templateUrl: './subtermsassociation.component.html',
  styleUrls: ['./subtermsassociation.component.scss']
})
export class SubtermsassociationComponent implements OnInit {
  subtermsAssociations: any;
  categorycode: any;

  constructor(public fwTermRead: FWTermsReadService) { }

  ngOnInit() {
    this.fwTermRead.fwSubTermBody.subscribe((data) => {
      if (data['associations']) {
        this.categorycode = data['category'];
        this.subtermsAssociations = data['associations'];
      } else {
        this.subtermsAssociations = [];
      }
    });
  }

}
