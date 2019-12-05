import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DownloadExcelService {

  constructor(public http: HttpClient) { }

  exportExcel(fwCode): Observable<any> {
    return new Observable(obs => {
      const oReq = new XMLHttpRequest();
      oReq.open('POST', '/downloadExcel', true);
      oReq.setRequestHeader('Content-Type', 'application/json');
      oReq.responseType = 'arraybuffer';
      oReq.onload = function (oEvent) {
        const arrayBuffer = oReq.response;
        const byteArray = new Uint8Array(arrayBuffer);
        obs.next(byteArray);
      };
      const body = JSON.stringify({framework: fwCode});
      oReq.send(body);
    });
}
}
