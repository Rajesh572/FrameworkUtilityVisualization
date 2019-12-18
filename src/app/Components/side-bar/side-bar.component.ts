import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
export interface DialogData {
  action: string;
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  create(): void {
    this.openModal('create');
  }

  update(): void {
    this.openModal('update');
  }
  helpAndSupport(): void {
    this.openModal('help');
  }
  downloadExcel() {
    this.openModal('download');
  }
  publishFramework() {
    this.openModal('publish');
  }
  checkprocessStatus() {
    this.openModal('status', '850px', '650px');
  }
  setDefaultFramework() {
    this.openModal('setdefaultframework');
  }
  openModal(action, width?, height?) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: width ? width : '550px',
      maxHeight: height ? height : '500px',
      data: { action : action}
    });
}
}
