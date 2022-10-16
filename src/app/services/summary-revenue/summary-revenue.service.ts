import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class SummaryRevenueService {
  private url: string = `${environment.baseUrl}/summary-revenue`;

  constructor(private http: HttpClient) {}

  httpGetSummaryRevenue(params?: { [key: string]: string | number }): Observable<any> {
    return this.http.get(this.url, { params });
  }

  httpGetSummaryRevenueToday(): Observable<any> {
    return this.http.get(`${this.url}/today`);
  }
}
