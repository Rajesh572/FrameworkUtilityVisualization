import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteDataService {
public data = new BehaviorSubject<any>('');
  constructor(public http: HttpClient) { }

  deleteItem(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


 return this.http.post<any>('/deleteItem', data , httpOptions);
  }
}
