import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ITransactionRequest } from 'src/app/models/ITransaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private url: string = `${environment.baseUrl}/transactions`;

  constructor(private http: HttpClient) {}

  httpCreateTransaction(body: ITransactionRequest): Observable<any> {
    return this.http.post(this.url, body);
  }

  httpGetTransactions(): Observable<any> {
    return this.http.get(this.url);
  }

  httpGetTransactionDetail(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  httpUpdateTransaction(
    id: number,
    body: ITransactionRequest
  ): Observable<any> {
    return this.http.put(`${this.url}/${id}`, body);
  }

  httpDeleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
