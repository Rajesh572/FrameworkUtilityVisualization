import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUpdateReqService {

  constructor(public http: HttpClient) { }
  sendingRequest(formData: FormData): Observable<any> {
    console.log(formData.get('File'));
    console.log(formData.get('fwName'));
    return this.http.post<any>('/createOrUpdateFramework',
      formData );
  }
}
