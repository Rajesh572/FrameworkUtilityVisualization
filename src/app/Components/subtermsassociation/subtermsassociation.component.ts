import { Component, OnInit } from '@angular/core';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';
import { LiveTermsService } from 'src/app/Services/liveTerms/live-terms.service';
import { SetLoaderService } from 'src/app/Services/setLoader/set-loader.service';

@Component({
  selector: 'app-subtermsassociation',
  templateUrl: './subtermsassociation.component.html',
  styleUrls: ['./subtermsassociation.component.scss']
})
export class SubtermsassociationComponent implements OnInit {
  subtermsAssociations = [];
  categorycode: any;
  subtermshierachicalData = [];
  currentIndex = 0;
  flag: boolean;
  constructor(public fwTermRead: FWTermsReadService, public liveTerms: LiveTermsService, public setLoader: SetLoaderService) { }

  ngOnInit() {
    this.fwTermRead.fwSubTermBody.subscribe((data) => {
      if (data['associations'] && data['associations'].length > 0) {
        this.categorycode = data['identifier'];
        this.flag = false;
        this.categorycode = this.categorycode.split('_');
        this.categorycode = this.categorycode[1];
        this.subtermsAssociations = data['associations'];
        this.liveTerms.findLiveTerms(this.subtermsAssociations).subscribe( (res) => {
          this.subtermsAssociations = [];
          this.subtermsAssociations = res;
          this.flag = true;
        //  this.setLoader.setLoaderFlag.next(false);
          for ( let i = 0; i < this.subtermsAssociations.length; i++) {
            this.categorycode = this.subtermsAssociations[i]['identifier'];
            this.categorycode = this.categorycode.split('_');
            this.subtermsAssociations[i]['category'] = this.categorycode[1];
          }
        },
        (err) => {
        //  this.setLoader.setLoaderFlag.next(false);
        });
      } else {
       // this.setLoader.setLoaderFlag.next(false);
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
