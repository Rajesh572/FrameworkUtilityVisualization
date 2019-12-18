import { Component, OnInit, OnDestroy } from '@angular/core';
import { copyStyles } from '@angular/animations/browser/src/util';
import { FWTermsReadService } from 'src/app/modules/shared/Services/FWTermsRead/fwterms-read.service';
import { LiveTermsService } from 'src/app/modules/shared/Services/liveTerms/live-terms.service';
import { SetLoaderService } from 'src/app/modules/shared/Services/setLoader/set-loader.service';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.scss']
})
export class AssociationsComponent implements OnInit, OnDestroy {
  associatedTerms: any;
  categorycode: any;
  fwCode: any;
  flag: boolean;
  reqArray = [];
  constructor(public fwTermRead: FWTermsReadService, public liveTerms: LiveTermsService,
    public setloader: SetLoaderService) { }

  ngOnInit() {
  const req =  this.fwTermRead.fwTermBody.subscribe((data) => {
      if (data['associations']) {
       /*  this.categorycode = data['identifier'];
        this.categorycode = this.categorycode.split('_');
        this.categorycode = this.categorycode;
        */
        this.associatedTerms = data['associations'];
        this.flag = false;
      const req2 =  this.liveTerms.findLiveTerms(this.associatedTerms).subscribe( (res) => {
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
            this.reqArray.push(req2);
          },
        (err) => {
            console.log('Error ', err);
            this.reqArray.push(req2);

        });

      } else {
        this.associatedTerms = [];
        this.flag = true;
      }
   this.reqArray.push(req);
    });
  }
ngOnDestroy() {
this.reqArray.forEach( (item) => {
  item.unsubscribe();
});
}
}
