import { Component, OnInit } from '@angular/core';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';
import { LiveTermsService } from 'src/app/Services/liveTerms/live-terms.service';
import { copyStyles } from '@angular/animations/browser/src/util';
import { SetLoaderService } from 'src/app/Services/setLoader/set-loader.service';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.scss']
})
export class AssociationsComponent implements OnInit {
  associatedTerms: any;
  categorycode: any;
  fwCode: any;
  flag: boolean;
  constructor(public fwTermRead: FWTermsReadService, public liveTerms: LiveTermsService,
    public setloader: SetLoaderService) { }

  ngOnInit() {
    this.fwTermRead.fwTermBody.subscribe((data) => {
      if (data['associations']) {
       /*  this.categorycode = data['identifier'];
        this.categorycode = this.categorycode.split('_');
        this.categorycode = this.categorycode;
        */
        this.associatedTerms = data['associations'];
        this.flag = false;
        this.liveTerms.findLiveTerms(this.associatedTerms).subscribe( (res) => {
            this.associatedTerms = [];
            this.associatedTerms = res;
            let c = 0;
            for ( let i = 0; i < this.associatedTerms.length; i++) {
              this.categorycode = this.associatedTerms[i]['identifier'];
              this.categorycode = this.categorycode.split('_');
              this.fwCode = this.categorycode[0];
              this.associatedTerms[i]['category'] = this.categorycode[1];
              this.flag = true;
              c = c + 1;
              if (c === this.associatedTerms.length-1) {
                this.setloader.setLoaderFlag.next(false);
              }
            }
        },
        (err) => {
            console.log('Error ', err);
        });
      } else {
        this.associatedTerms = [];
        this.flag = true;
      }
    });
  }

}
