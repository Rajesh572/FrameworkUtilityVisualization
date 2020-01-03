import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Config } from 'protractor';
import { FWreadService } from '../../Services/FWread/fwread.service';
import { FWCatgReadService } from 'src/app/modules/shared/Services/FWCatgRead/fwcatg-read.service';
import { ComponentRefService } from 'src/app/modules/shared/Services/ComponentRef/component-ref.service';
import { DeleteDataService } from '../../Services/deleteData/delete-data.service';
import { SetLoaderService } from 'src/app/modules/shared/Services/setLoader/set-loader.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit , OnDestroy {
  categories = [];
  frameworkCode: any;
  terms: any;
  catgCode: any;
  isSingleClick = true;
  selectedIndex: any;
  flag = true;
  reqArray = [];
  @Output() someEvent = new EventEmitter<string>();
  constructor(public fwRead: FWreadService, public fwCatgRead: FWCatgReadService, public compRef: ComponentRefService,
    public todeleteData: DeleteDataService, public setLoader: SetLoaderService) { }

  ngOnInit() {
 const req =   this.fwRead.fwResponse.subscribe((data) => {
      console.log(data);
      this.frameworkCode = data.frameworkCode;
      this.categories = data.fwReadBody;
      if (!!this.categories && this.categories.length > 0) {
        this.catgCode = (this.categories[0]);
        this.readCategory(this.catgCode, 0);
        this.reqArray.push(req);
      }
    });
  }
  ngOnDestroy() {
    this.reqArray.forEach( (item) => {
      item.unsubscribe();
    });
  }
  readCategory(catg, index) {
    this.compRef.ref.next({ comp: CategoriesComponent });
    this.someEvent.next('');
    this.selectedIndex = index;
    if (!this.flag) {
      this.setLoader.setLoaderFlag.next(true);
    }
    const catgsplit = catg['identifier'].split('_');
    this.catgCode = catgsplit[catgsplit.length-1];
   const req = this.fwCatgRead.readCategory(this.frameworkCode, this.catgCode).subscribe((data) => {
      console.log(data['result'].category.terms);
      this.flag = false;
      if (data['result'].category.terms.length > 0) {
        this.fwCatgRead.fwResponse.next({
          frameworkCode: this.frameworkCode, categoryCode: this.catgCode,
          fwReadBody: data['result'].category.terms
        });
        this.reqArray.push(req);
      } else {
        this.setLoader.setLoaderFlag.next(false);
        this.reqArray.push(req);

      }
    },
      (error) => {
        this.setLoader.setLoaderFlag.next(false);

        console.log('error in reading terms', error);
        this.reqArray.push(req);
      });
  }
  deletedCategory(event, catg) {
    event.preventDefault();
    this.isSingleClick = false;
    console.log('To delete ', catg);
  }
  dragEnd(event, item) {
    console.log('event', event, item);
    this.todeleteData.data.next({ type: 'category', item: item });
  }
}
