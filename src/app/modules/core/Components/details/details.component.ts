import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, SystemJsNgModuleLoader, ErrorHandler, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DragAndDropModule, DropEvent } from 'angular-draggable-droppable';
import { FWreadService } from '../../Services/FWread/fwread.service';
import { FWCatgReadService } from 'src/app/modules/shared/Services/FWCatgRead/fwcatg-read.service';
import { FWTermsReadService } from 'src/app/modules/shared/Services/FWTermsRead/fwterms-read.service';
import { SetLoaderService } from 'src/app/modules/shared/Services/setLoader/set-loader.service';
import { SetNumberOfDivsService } from 'src/app/modules/shared/Services/SetNumberOfDivs/set-number-of-divs.service';
import { ComponentRefService } from 'src/app/modules/shared/Services/ComponentRef/component-ref.service';
import { DeleteDataService } from '../../Services/deleteData/delete-data.service';
import { ModalComponent } from 'src/app/modules/shared/Components/modal/modal.component';
export interface DialogData {
  action: string;
}
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
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
  selectedFile : File = null;
  componentsOfSubterms = [];
  componentsOfSubtermsAssociation = [];
  reqArray = [];
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('container2', {read: ViewContainerRef}) container2: ViewContainerRef;
  found = false;
  constructor(public fwreadService: FWreadService, public fwCatgService: FWCatgReadService,
    public fwTermService: FWTermsReadService, public setLoader: SetLoaderService, public numberOfDivs: SetNumberOfDivsService,
    public componentFactoryResolver: ComponentFactoryResolver, public compRef: ComponentRefService,
    public dialog: MatDialog, public todeleteData: DeleteDataService) {

      console.log('constructor ', this.componentsOfSubterms);
     }

  ngOnInit() {
   const req = this.numberOfDivs.hierachicalData.subscribe((data2) => {
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
      this.reqArray.push(req);
    },
    (err) => {
      console.log(err);
      this.reqArray.push(req);
    });
  const req2 = this.numberOfDivs.hierachicalAssociation.subscribe((data) => {

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
        component.instance['currentIndex'] = data['index'];
        console.log('componentsOfSubtermsAssociation array', this.componentsOfSubtermsAssociation);
      }
      this.reqArray.push(req);

    },
    (err) => {
      console.log(err);
      this.reqArray.push(req);

    });
  }
  /* }); */

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
  drag(dragEvent, content) {
    console.log(dragEvent);
    console.log(content);
  }
  openModal(action, width?, height?) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: width ? width : '550px',
      maxHeight: height ? height : '500px',
      data: { action : action}
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    }); */
  }
  onDrop({ dropData }: DropEvent<string>): void {
     this.openModal('delete');
  }
  readFramework() {
    this.setLoader.setLoaderFlag.next(true);
    this.clearFramework();
    console.log(this.fwcode);
    // this.setLoader.setLoaderFlag.next(true);
   const req = this.fwreadService.readFramework(this.fwcode).subscribe((data) => {
      //   this.setLoader.setLoaderFlag.next(false);
      this.categories = data['result'].framework.categories;
      if (this.categories.length > 0){
        this.fwreadService.fwResponse.next({ frameworkCode: this.fwcode, fwReadBody: this.categories });

      } else {
           this.setLoader.setLoaderFlag.next(false);
      }
      this.reqArray.push(req);

    },
      (error) => {
        this.setLoader.setLoaderFlag.next(false);
        this.error = error;
        this.flag = true;
        this.reqArray.push(req);

      }
    );
 const req2 =  this.fwTermService.fwTermBody.subscribe((data) => {
      if (data['children']) {
        this.subterms = data['children'];
      } else {
        this.subterms = [];
      }
      this.reqArray.push(req);
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
  ngOnDestroy() {
    this.reqArray.forEach( (item) => {
      item.unsubscribe();
    });
  }
}
