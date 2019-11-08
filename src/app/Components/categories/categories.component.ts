import { Component, OnInit } from '@angular/core';
import { FWreadService } from 'src/app/Services/FWread/fwread.service';
import { Config } from 'protractor';
import { FWCatgReadService } from 'src/app/Services/FWCatgRead/fwcatg-read.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories = [];
  frameworkCode: any;
  terms: any;
  catgCode: any;
selectedIndex: any;
  constructor(public fwRead: FWreadService, public fwCatgRead: FWCatgReadService) { }

  ngOnInit() {
    this.fwRead.fwResponse.subscribe((data) => {
      console.log(data);
      this.frameworkCode = data.frameworkCode;
      this.categories = data.fwReadBody;
      if (!!this.categories && this.categories.length > 0) {
        this.catgCode = (this.categories[0]);
        this.readCategory(this.catgCode, 0);
    }
      });
  }
  readCategory(catg, index) {
    this.selectedIndex = index;
    this.catgCode = ((catg['identifier']).split('_'))[1];
    this.fwCatgRead.readCategory(this.frameworkCode, this.catgCode).subscribe((data) => {
console.log(data['result'].category.terms);
this.fwCatgRead.fwResponse.next({frameworkCode: this.frameworkCode, categoryCode: this.catgCode,
  fwReadBody: data['result'].category.terms});
    },
    (error) => {
      console.log('error in reading terms', error);
    });
  }
}
