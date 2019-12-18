import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(public http: HttpClient) { }

  sendErrorMessage(message){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

return this.http.post<any>('/setErrorLogs', {errmsg: message}, httpOptions);
  }
}
