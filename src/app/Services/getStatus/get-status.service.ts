import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetStatusService {

  constructor(public http: HttpClient) { }

  retrieveStatus(): Observable<any> {
    return this.http.get<any>('/retrieveStatus');
  }
}
