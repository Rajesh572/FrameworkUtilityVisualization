import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jsondata from 'instanceDetails.json';

@Injectable({
  providedIn: 'root'
})
export class FWreadService {
  json: any;
  public fwResponse = new BehaviorSubject<any>('');
  fwResponse$ = this.fwResponse.asObservable();
  configUrl: string;
  constructor(public http: HttpClient) {
    this.json = jsondata['default'];
  }
  readFramework(fwcode) {
    return this.http.get(this.json.instance_url + this.json.framework_read + fwcode);
  }
}
