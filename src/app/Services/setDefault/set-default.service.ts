import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetDefaultService {

  constructor(public http: HttpClient) { }

  setFramework(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


 return this.http.post<any>('/setdefaultframework', {fwCode:  data['fwCode'], rootorgId: data['rootorgId'], pid: data['pid']}, httpOptions);
  }
}
