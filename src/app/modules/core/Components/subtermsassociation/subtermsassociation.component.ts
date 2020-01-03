import { Component, OnInit, OnDestroy } from '@angular/core';
import { FWTermsReadService } from 'src/app/modules/shared/Services/FWTermsRead/fwterms-read.service';
import { LiveTermsService } from 'src/app/modules/shared/Services/liveTerms/live-terms.service';
import { SetLoaderService } from 'src/app/modules/shared/Services/setLoader/set-loader.service';

@Component({
  selector: 'app-subtermsassociation',
  templateUrl: './subtermsassociation.component.html',
  styleUrls: ['./subtermsassociation.component.scss']
})
export class SubtermsassociationComponent implements OnInit, OnDestroy {
  subtermsAssociations = [];
  categorycode: any;
  fwCode = '';
  subtermshierachicalData = [];
  currentIndex = 0;
  flag: boolean;
  reqArray = [];
  constructor(public fwTermRead: FWTermsReadService, public liveTerms: LiveTermsService, public setLoader: SetLoaderService) { }

  ngOnInit() {
 const req =  this.fwTermRead.fwSubTermBody.subscribe((data) => {
      if (data['associations'] && data['associations'].length > 0) {
        this.categorycode = data['identifier'];
        this.flag = false;
        this.categorycode = this.categorycode.split('_');
        for (let j = 0 ; j < this.categorycode.length ; j++) {
           this.fwCode = this.fwCode + this.categorycode[j] ;
           if (! (j = this.categorycode.length - 1)){
               this.fwCode = this.fwCode + '_';
           }
        }
        this.categorycode = this.categorycode[this.categorycode.length - 1];
        this.subtermsAssociations = data['associations'];
        this.liveTerms.findLiveTerms(this.subtermsAssociations , this.fwCode).subscribe( (res) => {
          this.subtermsAssociations = [];
          this.subtermsAssociations = res;
          this.flag = true;
        //  this.setLoader.setLoaderFlag.next(false);
          for ( let i = 0; i < this.subtermsAssociations.length; i++) {
            this.categorycode = this.subtermsAssociations[i]['identifier'];
            this.categorycode = this.categorycode.split('_');
            this.subtermsAssociations[i]['category'] = this.categorycode[this.categorycode.length - 1];
          }
        },
        (err) => {
        //  this.setLoader.setLoaderFlag.next(false);
              this.reqArray.push(req);


        });
              this.reqArray.push(req);

      } else {
       // this.setLoader.setLoaderFlag.next(false);
      }
    });
    if (this.subtermshierachicalData.length > 0) {
      for ( let i = 0; i < this.subtermshierachicalData.length; i++) {
        this.categorycode = this.subtermshierachicalData[i]['identifier'];
        this.categorycode = this.categorycode.split('_');
        this.subtermshierachicalData[i]['category'] = this.categorycode[this.categorycode.length - 1];
      }
      this.flag = true;
    }
  console.log('subtermshierachicalData array', this.subtermshierachicalData);
  }
  ngOnDestroy() {
    this.reqArray.forEach( (item) => {
      item.unsubscribe();
    });
  }
}
