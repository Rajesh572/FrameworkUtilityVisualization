import { Component, OnInit } from '@angular/core';
import { FWreadService } from 'src/app/Services/FWread/fwread.service';
import { FWCatgReadService } from 'src/app/Services/FWCatgRead/fwcatg-read.service';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';
import { PublishFrameworkService } from 'src/app/Services/publishFramework/publish-framework.service';
import { SetLoaderService } from 'src/app/Services/setLoader/set-loader.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
fwcode: string;
  error: any;
  flag = false;
  categories: any;
  publishStatus = 0;
  constructor(public fwreadService: FWreadService, public fwCatgService: FWCatgReadService ,
    public fwTermService: FWTermsReadService, public fwPublishService: PublishFrameworkService, public setLoader: SetLoaderService) { }

  ngOnInit() {
  }
readFramework() {
  this.clearFramework();
  console.log(this.fwcode);
 // this.setLoader.setLoaderFlag.next(true);
  this.fwreadService.readFramework(this.fwcode).subscribe((data) => {
 //   this.setLoader.setLoaderFlag.next(false);
    this.categories = data['result'].framework.categories;
    this.fwreadService.fwResponse.next({frameworkCode: this.fwcode, fwReadBody: this.categories});
  },
  (error) => {this.error = error;
  this.flag = true;
  }
  );
}
publishFramework() {
this.fwPublishService.publishFramework(this.fwcode).subscribe((data) => {
  console.log(data);
  if (data['responseCode'] === 'OK') {
    this.publishStatus = 1;
  } else {
    this.publishStatus = 2;
  }
}, (error) => {
  console.log('error catched ', error);
});
}
clearFramework() {
  this.flag = false;
  this.publishStatus = 0;
this.fwreadService.fwResponse.next('');
this.fwCatgService.fwResponse.next('');
this.fwTermService.fwTermBody.next('');
this.fwTermService.fwSubTermBody.next('');
}
}
