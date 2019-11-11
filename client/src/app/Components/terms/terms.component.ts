import { Component, OnInit } from '@angular/core';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';
import { FWCatgReadService } from 'src/app/Services/FWCatgRead/fwcatg-read.service';
import { PublishFrameworkService } from 'src/app/Services/publishFramework/publish-framework.service';
import { SetLoaderService } from 'src/app/Services/setLoader/set-loader.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  fwcode: any;
  catgCode: any;
  terms: any;
  termcode: any;
  selectedIndex: any;

  constructor(public fwCatgRead: FWCatgReadService, public fwTermRead: FWTermsReadService, public setLoader: SetLoaderService) { }

  ngOnInit() {
    this.fwCatgRead.fwResponse.subscribe((data) => {
      this.fwcode = data.frameworkCode;
      this.catgCode = data.categoryCode;
      this.terms = data.fwReadBody;
      if (!!this.terms && this.terms.length > 0) {
        this.termcode = (this.terms[0]);
        this.readTerm(this.termcode, 0);
      }
    });
  }
  readTerm(term, index) {
    //   this.setLoader.setLoaderFlag.next(true);
    this.selectedIndex = index;
    console.log("Selected Index", this.selectedIndex);
    term = ((term['identifier']).split('_'))[2];
    this.fwTermRead.readTerms(this.fwcode, this.catgCode, term).
      subscribe((data) => {
        //     this.setLoader.setLoaderFlag.next(false);
        console.log(data['result'].term);
        this.fwTermRead.fwTermBody.next(data['result'].term);
      },
      (error) => {
        console.log('Error in terms component', error);
      });
  }
  public trackByFunction(item, index) {
    if (!item) {
      return null;
    }
    return item['identifier'];
  }
}
