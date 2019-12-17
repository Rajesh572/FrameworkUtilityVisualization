import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessStatusService {

  constructor(public http: HttpClient) { }
  getstatusreport() {
    return this.http.get('/getReport');
  }
}
