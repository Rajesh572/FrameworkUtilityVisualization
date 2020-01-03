import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FWCatgReadService } from 'src/app/modules/shared/Services/FWCatgRead/fwcatg-read.service';
import { FWTermsReadService } from 'src/app/modules/shared/Services/FWTermsRead/fwterms-read.service';
import { SetLoaderService } from 'src/app/modules/shared/Services/setLoader/set-loader.service';
import { ComponentRefService } from 'src/app/modules/shared/Services/ComponentRef/component-ref.service';
import { DeleteDataService } from '../../Services/deleteData/delete-data.service';
import { LiveTermsService } from 'src/app/modules/shared/Services/liveTerms/live-terms.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit, OnDestroy {
  fwcode: any;
  catgCode: any;
  terms: any;
  termcode: any;
  selectedIndex: any;
  isSingleClick = true;
  flag = false;
  reqArray = [];
  @Output() someEvent = new EventEmitter<string>();
  constructor(public fwCatgRead: FWCatgReadService, public fwTermRead: FWTermsReadService, public setLoader: SetLoaderService,
    public compRef: ComponentRefService, public todeleteData: DeleteDataService, public liveTerms: LiveTermsService) { }

  ngOnInit() {
    const req = this.fwCatgRead.fwResponse.subscribe((data) => {
      this.flag = false;
      this.fwcode = data.frameworkCode;
      this.catgCode = data.categoryCode;
      this.terms = data.fwReadBody;
      if (!!this.terms && this.terms.length > 0) {
        const t = this.terms;
        this.terms = [];

        /* this.findLiveTerms((tempArray) => {
          this.terms = [];
          this.terms = tempArray;
          this.flag = true;
          this.termcode = (this.terms[0]);
          this.readTerm(this.termcode, 0);
        }); */
        const req2 = this.liveTerms.findLiveTerms(t , this.fwcode).
          subscribe((res) => {
            if (res != null && res) {
              this.terms = [];
              this.terms = res;
              this.flag = true;
              this.termcode = (this.terms[0]);
              if (this.terms.length > 0){
                this.readTerm(this.termcode, 0);

              }
            }
            this.reqArray.push(req);

          },
            (err) => {
              console.log(err);
              this.setLoader.setLoaderFlag.next(false);
              this.reqArray.push(req);


            });
        this.reqArray.push(req);
      }
    });
  }
  readTerm(term, index) {
    this.compRef.ref.next({ comp: TermsComponent });
    this.someEvent.next('');
    //   this.setLoader.setLoaderFlag.next(true);
    this.selectedIndex = index;
    console.log('Selected Index', this.selectedIndex);
    const termsplit = ((term['identifier']).split('_'));
    term = termsplit[termsplit.length-1];
    const req = this.fwTermRead.readTerms(this.fwcode, this.catgCode, term).
      subscribe((data) => {
        //     this.setLoader.setLoaderFlag.next(false);
        console.log(data['result'].term);
        if (data['result'].term['associations']) {
          if (data['result'].term['associations'].length > 0) {
            this.setLoader.setLoaderFlag.next(true);
          } else {
            this.setLoader.setLoaderFlag.next(false);

          }
        } else {
          this.setLoader.setLoaderFlag.next(false);

        }
        this.fwTermRead.fwTermBody.next(data['result'].term);
        this.reqArray.push(req);


      },
        (error) => {
          console.log('Error in terms component', error);
          this.reqArray.push(req);


        });
  }
  dragEnd(event, item) {
    console.log('event', event, item);
    this.todeleteData.data.next({ type: 'term', item: item });
  }
  ngOnDestroy() {
    this.reqArray.forEach((item) => {
      item.unsubscribe();
    });
  }
}
