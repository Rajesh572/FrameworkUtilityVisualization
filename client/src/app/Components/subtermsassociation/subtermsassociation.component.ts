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
  subtermshierachicalData = [];
  currentIndex = 0;
  constructor(public fwTermRead: FWTermsReadService) { }

  ngOnInit() {
    this.fwTermRead.fwSubTermBody.subscribe((data) => {
      if (data['associations'] && data['associations'].length > 0) {
        this.categorycode = data['identifier'];
        this.categorycode = this.categorycode.split('_');
        this.categorycode = this.categorycode[1];
        this.subtermsAssociations = data['associations'];
        for ( let i = 0; i < this.subtermsAssociations.length; i++) {
          this.categorycode = this.subtermsAssociations[i]['identifier'];
          this.categorycode = this.categorycode.split('_');
          this.subtermsAssociations[i]['category'] = this.categorycode[1];
        }
      } else {
        this.subtermsAssociations = [];
      }
    });
    if (this.subtermshierachicalData.length > 0) {
      for ( let i = 0; i < this.subtermshierachicalData.length; i++) {
        this.categorycode = this.subtermshierachicalData[i]['identifier'];
        this.categorycode = this.categorycode.split('_');
        this.subtermshierachicalData[i]['category'] = this.categorycode[1];
      }
    }
  console.log('subtermshierachicalData array', this.subtermshierachicalData);
  }

}
