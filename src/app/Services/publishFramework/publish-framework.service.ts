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
        'Content-Type': 'application/json'
      })
    };


 return this.http.post<any>('/framework/publish', {framework:  fwCode, channel: this.json.channel_id}, httpOptions);
  }
}
