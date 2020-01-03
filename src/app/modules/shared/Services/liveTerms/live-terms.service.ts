import { Injectable } from '@angular/core';
import { FWTermsReadService } from '../FWTermsRead/fwterms-read.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiveTermsService {
  constructor(public http: HttpClient) { }

  findLiveTerms( terms , fwCode): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('/getLiveTerms', { terms : terms , action : 3 , fwCode : fwCode}, httpOptions);

    }
  }
