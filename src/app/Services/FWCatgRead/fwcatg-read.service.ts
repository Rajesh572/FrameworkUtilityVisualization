import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from './../../../environments/environment';
import * as jsondata from 'instanceDetails.json';
import { FWTermsReadService } from '../FWTermsRead/fwterms-read.service';
@Injectable({
  providedIn: 'root'
})
export class FWCatgReadService {
  public fwResponse = new BehaviorSubject<any>('');
  fwResponse$ = this.fwResponse.asObservable();
  json: any;

  constructor(public http: HttpClient, public fwTermRead: FWTermsReadService) {
    this.json = jsondata['default'];
   }

  readCategory(fwCode, catgCode) {
    this.fwTermRead.fwTermBody.next('');
    this.fwTermRead.fwSubTermBody.next('');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.json.api_key
      })
    };
    return this.http.get((this.json.instance_url + this.json.category_read + catgCode + '?framework=' + fwCode), httpOptions);
  }
}
