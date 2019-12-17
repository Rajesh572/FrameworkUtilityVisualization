import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUpdateReqService } from 'src/app/Services/CreateUpdateReq/create-update-req.service';
import { DeleteDataService } from 'src/app/Services/deleteData/delete-data.service';
import { FWTermsReadService } from 'src/app/Services/FWTermsRead/fwterms-read.service';
import { PublishFrameworkService } from 'src/app/Services/publishFramework/publish-framework.service';
import { DownloadExcelService } from 'src/app/Services/DownloadExcel/download-excel.service';
import { SetDefaultService } from 'src/app/Services/setDefault/set-default.service';
import { GetStatusService } from 'src/app/Services/getStatus/get-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material';
import { ProcessStatusService } from 'src/app/Services/ProcessStatus/process-status.service';
import { ProcessIdStorageService } from 'src/app/Services/processId/process-id-storage.service';
import { ErrorHandlerService } from 'src/app/Services/errorHandler/error-handler.service';
import { CustomHandler } from 'src/app/custom-handler';
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
  fd: any;
  selectedFile: File = null;
  typeOfItem: any;
  codeOfItem: any;
  fwcode: any;
  children = [];
  catgCode: any;
  nameOfItem: any;
  rootorgId: any;
  selectedAll: any;
  subTermsToDelete = [];
  successRes = false;
  failureRes = false;
  intervalId = null;
  processFound = [];
  termsdeletionProcess = false;
  mandatoryfields: boolean;
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public createupdate: CreateUpdateReqService,
    public todeleteData: DeleteDataService, public termRead: FWTermsReadService, public fwPublishService: PublishFrameworkService,
    public exportExcel: DownloadExcelService,
    public setDefault: SetDefaultService, public getStatus: GetStatusService, public snackBar: MatSnackBar,
    public getReport: ProcessStatusService, public processIdData: ProcessIdStorageService, public errorhandler: ErrorHandlerService) { }

  ngOnInit() {
    if (this.data['action'] === 'status') {
      this.getProcessStatus();
    } else {

      this.todeleteData.data.subscribe((info) => {
        console.log('Data to delete ', info, this.data['action']);
        this.successRes = false;
        this.failureRes = false;
        this.termsdeletionProcess = false;
        let tempArray;
        if (info != null && info !== "") {
          this.typeOfItem = info['type'];
          this.codeOfItem = info.item['identifier'];
          this.nameOfItem = info.item['name'];
          tempArray = this.codeOfItem.split('_');
          if (tempArray.length === 3) {
            this.fwcode = tempArray[0];
            this.catgCode = tempArray[1];
            this.codeOfItem = tempArray[2];
            this.readSubTerms(this.fwcode, this.catgCode, this.codeOfItem);
          } else if (tempArray.length === 2) {
            this.fwcode = tempArray[0];
            this.codeOfItem = tempArray[1];
          }
        }
      });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getProcessStatus() {
    this.getReport.getstatusreport().subscribe((res) => {
      console.log('Response of json', res);
      this.processIdData.processIdArray.subscribe((items) => {
        items.forEach((val) => {
          if (res[val['processId']]) {
            this.processFound.push({
              'pid': val['processId'],
              'startTime': val['startTime'],
              'endTime': this.getTime(),
              'fwcode': val['frameworkcode'],
              'action': res[val['processId']].action,
              'status': res[val['processId']].status,
              'reason': res[val['processId']].reason
            });
            this.setAllLogs(res, val);
          }
        });
      });
    },
      (err) => {
        console.log('Error', err);
      });
  }
  sendReq() {
    if (this.data['action'] === 'delete') {
      this.sendReqForDelete();
    } else if ((this.data['action'] === 'create' || this.data['action'] === 'update')
      && this.name != null && this.code != null && this.selectedFile != null) {
      console.log('Sending req with details', this.data['action'], this.name, this.code, this.description, this.selectedFile);
      const newFd = new FormData();
      newFd.append('File', this.selectedFile, this.selectedFile.name);
      newFd.append('fwName', this.name);
      newFd.append('fwCode', this.code);
      newFd.append('fwDescription', this.description);
      newFd.append('action', this.data['action']);
      const uuidv1 = require('uuid/v1');
      const pid = uuidv1();
      this.updateProcessIdArray(pid);
      newFd.append('pid', pid);
      // this.checkStatus();
      this.onNoClick();
      if (this.data['action'] === 'create') {
        this.beforeResponseMessage('Framework creation started successfully');
      } else if (this.data['action'] === 'update') {
        this.beforeResponseMessage('Framework updation started successfully');
      }
      this.setAllLogs(pid,this.code, this.data['action']);

      this.createupdate.sendingRequest(newFd)
        .subscribe((res) => {
          this.dialogRef.close();
          if (res === null || res === undefined) {
            console.log('In response got ', res);
            return;
          }
          console.log('Status of ' + this.data['action'] + ' is' + res);
        },
          (err) => {
            console.log(err, 'error');
            if (err.error.text === 'Started Successfully') {
              this.intervalId = setInterval(this.checkStatus.bind(this), 20000);
            }
         //   throw new GlobalException('Failed');
          });
    } else if (this.data.action === 'publish') {
      this.publishFramework();
    } else if (this.data.action === 'download') {
      this.downloadExcel();
    } else if (this.data.action === 'setdefaultframework') {
      this.setDefaultFramework();
    } else {
      this.mandatoryfields = true;
      console.log('All mandatory inputs are not filled');
    }
  }

  sendReqForDelete() {
    if (this.typeOfItem === 'category') {
      this.onNoClick();
     // this.setAllLogs('Deletion of category started', this.fwcode, this.data['action']);
      this.beforeResponseMessage('Deletion of category started successfully');
      this.todeleteData.deleteItem({ type: this.typeOfItem, fwCode: this.fwcode, catgCode: this.codeOfItem })
        .subscribe((res) => {
          console.log('Delete category response', res);
        },
          (err) => {
            console.log('Delete category error', err);
            this.afterResponseMessage(err, 'Deletion of category ');
          });
    } else {
      // delete terms in loop
      this.onNoClick();
      this.beforeResponseMessage('Deletion of terms started successfully');
      this.subTermsToDelete.push(this.codeOfItem);
      this.initiateDeleteSequence((deleteLog) => {
        console.log('delete log is ', deleteLog);
      });
    }
  }
  publishFramework() {
    if (this.fwcode === '' || this.fwcode === undefined) {
      // this.publishStatus = 3;
      return;
    }
    this.onNoClick();
    const uuidv1 = require('uuid/v1');
    const pid = uuidv1();
    this.updateProcessIdArray(pid);
    this.setAllLogs(pid, this.fwcode, this.data['action']);
    this.beforeResponseMessage('Publish framework started successfully');
    this.fwPublishService.publishFramework(this.fwcode, pid).subscribe((res) => {
      if (res === null || res === undefined) {
        console.log('In response got ', res);
        return;
      }
      console.log('publish status', res.status);
      if (res.status === 'successful') {
        // this.publishStatus = 1;
      } else {
        // this.publishStatus = 2;
      }
    }, (error) => {
      console.log('error catched ', error);
      this.afterResponseMessage(error, 'Publishing Framework ');
    });
  }
  downloadExcel() {
    console.log(this.fwcode);
    if (this.fwcode === null || this.fwcode === '') {
      return;
    }
    const uuidv1 = require('uuid/v1');
    const pid = uuidv1();
    this.updateProcessIdArray(pid);
    this.onNoClick();
    this.setAllLogs(pid, this.fwcode, this.data['action']);

    this.beforeResponseMessage('Downloading Excel started successfully');
    this.exportExcel.exportExcel(this.fwcode, pid).subscribe(
      (res) => {
        if (res === null || res === undefined) {
          console.log('In response got ', res);
          return;
        }
        this.afterResponseMessage('successful', 'Downloading excel ');
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
        console.log(error);
        this.afterResponseMessage('failed', 'Downloading Excel ');
      });

  }
  setAllLogs(res, val, action?) {
    let msg = '' ;
    if (action) {
        if (action === 'delete') {
           msg = 'Deletion';
        } else {
          msg = ' ProcessId:' + res + ' FrameworkCode:' + val + ' Action:' +
          action;
        }
    } else {
      msg = ' ProcessId:' + val['processId'] + ' Action:' + res[val['processId']].action + ' Status:' +
      res[val['processId']].status;

    }
            this.errorhandler.sendErrorMessage(this.getTime() + '   ' + msg).subscribe( ( response ) => {
              console.log(response);
            },
            (err) => {
              console.log(err);
            });
  }
  setDefaultFramework() {
    this.onNoClick();

    this.beforeResponseMessage('Setting default framework started successfully');
    const uuidv1 = require('uuid/v1');
    const processId = uuidv1();
    this.setAllLogs(processId, this.fwcode, this.data['action']);
    this.updateProcessIdArray(processId);
   const req = this.setDefault.setFramework({ fwCode: this.fwcode, rootorgId: this.rootorgId, pid: processId }).subscribe
      ((res) => {
      },
        (err) => {
          this.afterResponseMessage(err, 'Setting Default Frammework ');
          req.unsubscribe();
        });
  }
  initiateDeleteSequence(deletedCB) {
    const deleteLog = {
      totalRequests: this.subTermsToDelete.length,
      requestsFailed: 0,
    };

    for (let i = 0; i < this.subTermsToDelete.length; i++) {
      this.todeleteData.deleteItem({
        type: this.typeOfItem, fwCode: this.fwcode, catgCode: this.catgCode,
        termCode: this.subTermsToDelete[i]
      })
        .subscribe((res) => {
          console.log('Delete term response', res);
          deleteLog.totalRequests -= 1;

          if (deleteLog.totalRequests === 0) {
            // requests finished
            this.afterResponseMessage('successful', 'Deletion process of term/terms ');

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
              this.termsdeletionProcess = true;
              this.afterResponseMessage('successful', 'Deletion process of term/terms ');
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
    if (event.target.checked) {
      this.subTermsToDelete.push((item['identifier'].split('_'))[2]);
    } else {
      // remove from the list
      this.subTermsToDelete = this.subTermsToDelete.filter(subTerm => {
        return subTerm !== item['identifier'].split('_')[2];
      });
    }
    this.select();
  }
  select() {
    this.selectedAll = this.children.every(function (item2: any) {
      return item2.selected === true;
    });
  }
  readSubTerms(fwcode, catgCode, codeOfItem) {
    this.termRead.readTerms(fwcode, catgCode, codeOfItem).subscribe((res) => {
      let temp = [];
      if (res['result'].term['children']) {
        temp = res['result'].term['children'];
      }
      if (temp.length > 0) {
        this.children = temp;
        this.initiateReadSequence((cb) => {
          console.log('');
        });
      }
    },
      (err) => {
        console.log('Error ', err);
      });
  }
  initiateReadSequence(CB) {
    const totalreq = this.children.length;
    let completedReq = 0;
    let temp = [];
    let tempObj = {};
    for (let i = 0; i < this.children.length; i++) {
      tempObj[this.children[i]['identifier']] = i;
      const subtermCode = (this.children[i]['identifier']).split('_')[2];
      this.termRead.readTerms(this.fwcode, this.catgCode, subtermCode).subscribe((res) => {
        if (res['result'].term['children']) {
          temp = res['result'].term['children'];
        }
        if (temp.length > 0) {
          console.log(res['result'].term['identifier']);
          this.children[tempObj[res['result'].term['identifier']]]['hierarchy'] = true;
        }
        completedReq = completedReq + 1;
        if (completedReq === totalreq) {
          CB('');
        }
      },
        (err) => {
          completedReq = completedReq + 1;
          if (completedReq === totalreq) {
            CB('');
          }
        });
    }

  }
  checkuncheckAll(event) {
    for (let i = 0; i < this.children.length; i++) {
      this.subTermsToDelete.push((this.children[i]['identifier'].split('_'))[2]);
      this.children[i].selected = this.selectedAll;
    }
    if (event.target.checked === false) {
      const temp = this.subTermsToDelete[0];
      this.subTermsToDelete = [];
    }
  }
  afterResponseMessage(res, message) {
    const config = new MatSnackBarConfig();
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    config.duration = 5000;
    if (res === 'successful' || res.error.text === 'successful') {
   //   this.setAllLogs(message, this.fwcode, this.data['action']);
      this.snackBar.open(message + 'successful', 'Close', config);
    } else if (res !== 'false' || res.error.text !== 'false') {
   //   this.setAllLogs(message, this.fwcode, this.data['action']);
      this.snackBar.open(message + 'failed', 'Close', config);
      throw new CustomHandler();
    }
  }
  beforeResponseMessage(message) {
    const config = new MatSnackBarConfig();
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    config.duration = 3000;
    this.snackBar.open(message, 'Close', config);
  }
  checkStatus() {
    this.getStatus.retrieveStatus().subscribe((res) => {
      console.log('Response', res);
      if (res[this.code] === 'failed') {
        clearInterval(this.intervalId);
        console.log('Request failed', res);
        if (this.data['action'] === 'create') {
          this.afterResponseMessage(res[this.code], 'Framework creation ');
        }
        if (this.data['action'] === 'update') {
          this.afterResponseMessage(res[this.code], 'Framework updation ');
        }
      } else if (res[this.code] === 'successful') {
        clearInterval(this.intervalId);
        console.log('Request successful', res);
        if (this.data['action'] === 'create') {
          this.afterResponseMessage(res[this.code], 'Framework creation ');
        }
        if (this.data['action'] === 'update') {
          this.afterResponseMessage(res[this.code], 'Framework updation ');
        }
      } else if (res[this.code] === 'false') {
        console.log('Request is in process ');
      }
    },
      (err) => {
        clearInterval(this.intervalId);
        if (this.data['action'] === 'create') {
          this.afterResponseMessage(err, 'Framework creation ');

        }
        if (this.data['action'] === 'update') {
          this.afterResponseMessage(err, 'Framework updation ');

        }

        console.log('Error', err);
      });
  }
  updateProcessIdArray(pid) {
    const newData = this.processIdData.processIdArray.value;
    newData.push({ 'processId': pid, 'startTime': this.getTime(), 'frameworkcode': this.code ? this.code : this.fwcode });
    this.processIdData.processIdArray.next(newData);
  }
  getTime() {
    const x = new Date();
    return x.getDate() + '-' + x.getMonth() + '-' + x.getFullYear() + '   ' + x.getHours() + ':' + x.getMinutes() + ':' + x.getSeconds()
  }
}
