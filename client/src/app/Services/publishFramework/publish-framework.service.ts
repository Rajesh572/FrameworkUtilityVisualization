import { Injectable } from '@angular/core';

import * as jsondata from 'instanceDetails.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PublishFrameworkService {
  json: any;

  constructor(public http: HttpClient) {this.json = jsondata['default'];}

  publishFramework(fwCode): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Channel-id': this.json.channel_id,
        'Authorization': 'Bearer ' + this.json.api_key
      })    
    };
    let bodyHeaders = {
      'Content-Type': 'application/json',
        'X-Channel-id': this.json.channel_id,
        'Authorization': 'Bearer ' + this.json.api_key
    }


    return this.http.post<any>('/post/data', {body_headers: bodyHeaders, url: this.json.instance_url + this.json.framework_publish + fwCode}, httpOptions);
  //  return this.http.post<any>(this.json.instance_url + this.json.framework_publish + fwCode, {}, httpOptions);
  }
}
