import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, SystemJsNgModuleLoader } from '@angular/core';
import { FWreadService } from 'src/app/Services/FWread/fwread.service';
import { FWCatgReadService } from 'src/app/Services/FWCatgRead/fwcatg-read.service';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';
import { PublishFrameworkService } from 'src/app/Services/publishFramework/publish-framework.service';
import { SetLoaderService } from 'src/app/Services/setLoader/set-loader.service';
import { SetNumberOfDivsService } from 'src/app/Services/SetNumberOfDivs/set-number-of-divs.service';
import { ComponentRefService } from 'src/app/Services/ComponentRef/component-ref.service';
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
  Arr = Array;
  publishStatus = 0;
  subtermschildrenassociationlength: any;
  subtermschildrenlength: any;
  subterms = [];
  count = 0;
  count2 = 0;
  componentsOfSubterms = [];
  componentsOfSubtermsAssociation = [];
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('container2', {read: ViewContainerRef}) container2: ViewContainerRef;
  found = false;
  constructor(public fwreadService: FWreadService, public fwCatgService: FWCatgReadService,
    public fwTermService: FWTermsReadService, public fwPublishService: PublishFrameworkService,
    public setLoader: SetLoaderService, public numberOfDivs: SetNumberOfDivsService,
    public componentFactoryResolver: ComponentFactoryResolver, public compRef: ComponentRefService) {

      console.log('constructor ', this.componentsOfSubterms);
     }

  ngOnInit() {
    this.numberOfDivs.hierachicalData.subscribe((data2) => {
      let component;
      if (data2['comp']) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(data2['comp']);
        component = this.container.createComponent(componentFactory);
        component.instance['reference'] = component;
        this.componentsOfSubterms.push(component);
        console.log('now the array is ', this.componentsOfSubterms);

      }
      if (data2['childData'] && data2['childData'].length > 0) {
       // this.count = this.count + 1;
        component.instance['currentIndex'] = this.componentsOfSubterms.length;
        component.instance['subtermshierachicalData'] = data2['childData'];
        console.log('componentsOfSubterms array', this.componentsOfSubterms);
      }
    });
    this.numberOfDivs.hierachicalAssociation.subscribe((data) => {

      let component;
      if (data['comp']) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(data['comp']);

        component = this.container2.createComponent(componentFactory);
        this.componentsOfSubtermsAssociation.push({'parentcomp': data['parentcomp'], comp: component});
      }
      if (data['associatedData'] && data['associatedData'].length > 0) {
       // this.count2 = this.count2 + 1;
        component.instance['currentIndex'] = this.componentsOfSubterms.length;
        component.instance['subtermshierachicalData'] = data['associatedData'];
        console.log('componentsOfSubtermsAssociation array', this.componentsOfSubtermsAssociation);
      }
    });
  }
  /* }); */

  readFramework() {
    this.clearFramework();
    console.log(this.fwcode);
    // this.setLoader.setLoaderFlag.next(true);
    this.fwreadService.readFramework(this.fwcode).subscribe((data) => {
      //   this.setLoader.setLoaderFlag.next(false);
      this.categories = data['result'].framework.categories;
      this.fwreadService.fwResponse.next({ frameworkCode: this.fwcode, fwReadBody: this.categories });
    },
      (error) => {
        this.error = error;
        this.flag = true;
      }
    );
    this.fwTermService.fwTermBody.subscribe((data) => {
      if (data['children']) {
        this.subterms = data['children'];
      } else {
        this.subterms = [];
      }
    });
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
    // this.numberOfDivs.numberOfSubtermAssociationDivs.next(1);
    //  this.numberOfDivs.compClass.next('');
    this.fwreadService.fwResponse.next('');
    this.fwCatgService.fwResponse.next('');
    this.fwTermService.fwTermBody.next('');
    this.fwTermService.fwSubTermBody.next('');
this.clearComponents('clearall');

  }
  clearComponents(event?) {
    let index = 0;
    let deletedComponents = [];
    this.compRef.ref.subscribe((ref) => {
      index = this.componentsOfSubterms.findIndex((compRefEle) => {
        return compRefEle == ref['comp'];
      });
      if (index !== undefined && index >= 0) {
        deletedComponents = this.componentsOfSubterms.splice(index + 1);
        deletedComponents.forEach((delComp) => {
          this.container.remove(this.container.indexOf(delComp));
        });
      } else {
        // flush all components
               this.removeSubterms();

      }

      index = -1;
      this.componentsOfSubtermsAssociation = this.componentsOfSubtermsAssociation.filter( (obj, i) => {
        if (ref['comp'] === obj['parentcomp']) {
         // this.found = true;
          index = i;
        } else if (ref['comp'] === undefined || i > index) {
          // remove the component
          this.container2.remove(this.container2.indexOf(obj['comp']));
          return false;
        }
        return true;
      });
    });
    if (event === 'clearall') {
      this.removeSubterms();
    }
  }
  removeSubterms() {
    this.componentsOfSubterms.forEach((comp) => {
      this.container.remove(this.container.indexOf(comp));
    });
    this.componentsOfSubterms = [];

  }
}
