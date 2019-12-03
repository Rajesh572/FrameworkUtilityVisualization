import { Injectable } from '@angular/core';
import * as jsondata from 'instanceDetails.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DownloadExcelService {

  constructor(public http: HttpClient) { }

  exportExcel(fwCode): Observable<any> {
    return this.http.post('/downloadExcel', {framework: fwCode},  {
    responseType: 'arraybuffer'});
  }
}
