import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private url: string = `${environment.baseUrl}/transactions`;

  constructor(private http: HttpClient) {}

  httpGetList(): Observable<Object> {
    return this.http.get(this.url);
  }
}
