import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUpdateReqService } from 'src/app/Services/CreateUpdateReq/create-update-req.service';
import { DeleteDataService } from 'src/app/Services/deleteData/delete-data.service';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';
export interface DialogData {
  action: string;
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  name: any;
  code: any;
  description: any;
  channel: any;
  fd: any;
  selectedFile: File = null;
  typeOfItem: any;
  codeOfItem: any;
  fwcode: any;
  children = [];
  catgCode: any;
  nameOfItem: any;
  subTermsToDelete = [];
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public createupdate: CreateUpdateReqService,
    public todeleteData: DeleteDataService, public termRead: FWTermsReadService) { }

  ngOnInit() {
    this.todeleteData.data.subscribe( (info) => {
      console.log('Data to delete ', info , this.data['action']);
      this.typeOfItem = info['type'];
      this.codeOfItem = info.item['identifier'];
      this.nameOfItem = info.item['name'];
      const tempArray = this.codeOfItem.split('_');
      if (tempArray.length === 3) {
        this.fwcode = tempArray[0];
        this.catgCode = tempArray[1];
        this.codeOfItem = tempArray[2];
        this.termRead.readTerms(this.fwcode, this.catgCode, this.codeOfItem).subscribe((res) => {
         console.log('Response', res['result'].term['children']);
         const temp = res['result'].term['children'];
         if (temp.length > 0) {
             this.children = temp;
         }
        },
        (err) => {
          console.log('Error ', err);
        });
      } else if (tempArray.length === 2) {
        this.fwcode = tempArray[0];
        this.codeOfItem = tempArray[1];
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  sendReq() {
    if (this.data['action'] === 'delete') {
      this.sendReqForDelete();
    } else {
    console.log('Sending req with details', this.data['action'], this.name, this.code, this.description, this.channel, this.selectedFile);
    const newFd = new FormData();
    newFd.append('File', this.selectedFile, this.selectedFile.name);
    newFd.append('fwName', this.name);
    newFd.append('fwCode', this.code);
    newFd.append('fwDescription', this.description);
    newFd.append('action', this.data['action']);
    newFd.append('channel', this.channel);
    this.createupdate.sendingRequest(newFd)
    .subscribe((res) => {
      if (res === null || res === undefined) {
          console.log('In response got ', res);
          return;
      }
      console.log('Status of ' + this.data['action'] + ' is' + res);
    },
    (err) => {
      console.log('error');
    });
  }
  }
  sendReqForDelete() {
    if (this.typeOfItem === 'category') {
      this.todeleteData.deleteItem({type: this.typeOfItem, fwCode : this.fwcode, catgCode : this.codeOfItem})
      .subscribe( (res) => {
           console.log('Delete category response', res);
      },
      (err) => {
        console.log('Delete category error', err);
      });
    } else {
      // delete terms in loop
      this.subTermsToDelete.push(this.codeOfItem);
      this.initiateDeleteSequence((deleteLog) => {
        console.log('delete log is ', deleteLog);
      });
    }
 }

 initiateDeleteSequence(deletedCB) {
   const deleteLog = {
     totalRequests : this.subTermsToDelete.length - 1,
     requestsFailed: 0,
   };

  for (let i = 0 ; i < this.subTermsToDelete.length ; i++) {
    this.todeleteData.deleteItem({type: this.typeOfItem, fwCode : this.fwcode, catgCode : this.catgCode ,
      termCode : this.subTermsToDelete[i]})
      .subscribe( (res) => {
           console.log('Delete term response', res);
           deleteLog.totalRequests -= 1;

           if (deleteLog.totalRequests === 0) {
             // requests finished
            deletedCB(deleteLog);
           }
      },
      (err) => {
           console.log('Delete term error', err);
           if (err.error.text === 'successful') {
            deleteLog.totalRequests -= 1;

            } else {
           deleteLog.totalRequests -= 1;
           deleteLog.requestsFailed += 1;
            }
           if (deleteLog.totalRequests === 0) {
            // requests finished
           deletedCB(deleteLog);
          }
      });
   }
 }

  handleUpload(e) {
    this.selectedFile = <File>e.target.files[0];
   }
   toggleEditable(event, item) {
     console.log(event);
    if ( event.target.checked ) {
      this.subTermsToDelete.push((item['identifier'].split('_'))[2]);
 } else {
    // remove from the list
    this.subTermsToDelete = this.subTermsToDelete.filter(subTerm => {
      return subTerm !==  item['identifier'].split('_')[2];
    });
    }
  }
}
