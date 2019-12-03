import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, SystemJsNgModuleLoader } from '@angular/core';
import { FWreadService } from 'src/app/Services/FWread/fwread.service';
import { FWCatgReadService } from 'src/app/Services/FWCatgRead/fwcatg-read.service';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';
import { PublishFrameworkService } from 'src/app/Services/publishFramework/publish-framework.service';
import { SetLoaderService } from 'src/app/Services/setLoader/set-loader.service';
import { SetNumberOfDivsService } from 'src/app/Services/SetNumberOfDivs/set-number-of-divs.service';
import { ComponentRefService } from 'src/app/Services/ComponentRef/component-ref.service';
import { DownloadExcelService } from 'src/app/Services/DownloadExcel/download-excel.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
export interface DialogData {
  action: string;
}
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
  selectedFile : File = null;
  componentsOfSubterms = [];
  componentsOfSubtermsAssociation = [];
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild('container2', {read: ViewContainerRef}) container2: ViewContainerRef;
  found = false;
  constructor(public fwreadService: FWreadService, public fwCatgService: FWCatgReadService,
    public fwTermService: FWTermsReadService, public fwPublishService: PublishFrameworkService,
    public setLoader: SetLoaderService, public numberOfDivs: SetNumberOfDivsService,
    public componentFactoryResolver: ComponentFactoryResolver, public compRef: ComponentRefService,
    public exportExcel: DownloadExcelService, public dialog: MatDialog) {

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
    if (this.fwcode === '' || this.fwcode === undefined) {
          this.publishStatus = 3;
          return;
    }
    this.fwPublishService.publishFramework(this.fwcode).subscribe((res) => {
      console.log('publish status', res.status);
       if (res.status === 'successful') {
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
  downloadExcel() {
    console.log(this.fwcode);
    this.exportExcel.exportExcel(this.fwcode).subscribe(
      (res) => {
        const binaryData = [];
        binaryData.push(res);
        const blob = new Blob((binaryData), { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
         const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'demo.xlsx';
        document.body.appendChild(a);
        a.click();
    },
    (error) => {
      const binaryData = [];
      binaryData.push(error.error.text);
      console.log('Inside error', error.error.text);
      const blob = new Blob((binaryData), { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'demo.xlsx';
        document.body.appendChild(a);
        a.click();
    });

  }
  drag(dragEvent, content) {
    console.log(dragEvent);
    console.log(content);
  }
  create(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
      data: { action : 'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  update(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
      data: { action : 'update'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
   s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
}
