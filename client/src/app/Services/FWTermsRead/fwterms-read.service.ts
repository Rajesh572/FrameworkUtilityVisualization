import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import * as jsondata from 'instanceDetails.json';
import { SetLoaderService } from '../setLoader/set-loader.service';
@Injectable({
  providedIn: 'root'
})
export class FWTermsReadService {

  public fwTermBody = new BehaviorSubject<any>('');
  fwTermBody$ = this.fwTermBody.asObservable();

  public fwSubTermBody = new BehaviorSubject<any>('');
  fwSubTermBody$ = this.fwTermBody.asObservable();
  json: any;
  constructor(public http: HttpClient) {
    this.json = jsondata['default'];
  }
  readTerms(fwCode, catgCode, term) {
    this.fwSubTermBody.next('');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.json.api_key
      })
    };
    return this.http
      .get((this.json.instance_url + this.json.terms_read + term + '?framework=' + fwCode + '&category=' + catgCode), httpOptions);
  }
  readSubTerms(fwCode, catgCode, term) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.json.api_key
      })
    };
    return this.http
      .get((this.json.instance_url + this.json.terms_read + term + '?framework=' + fwCode + '&category=' + catgCode), httpOptions);
  }
}
