import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUpdateReqService } from 'src/app/Services/CreateUpdateReq/create-update-req.service';
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
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public createupdate: CreateUpdateReqService) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  sendReq() {
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
      console.log('Status of ' + this.data['action'] + ' is' + res);
    },
    (err) => {
      console.log('error');
    });
  }
  handleUpload(e) {
    this.selectedFile = <File>e.target.files[0];
   }
}
