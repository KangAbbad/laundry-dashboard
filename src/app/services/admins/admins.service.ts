import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IRegisterRequest } from 'src/app/models/IAuth';
import { IAdminRequest } from 'src/app/models/IAdmin';

@Injectable({ providedIn: 'root' })
export class AdminsService {
  private url: string = `${environment.baseUrl}/admins`;
  private signupUrl: string = `${environment.baseUrl}/signup`;

  constructor(private http: HttpClient) {}

  httpCreateAdmin(body: IRegisterRequest): Observable<any> {
    return this.http.post(this.signupUrl, body);
  }

  httpGetAdmins(params?: { [key: string]: string | number }): Observable<any> {
    return this.http.get(this.url, { params });
  }

  httpGetAdminDetail(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  httpGetAdminExcel(): Observable<any> {
    return this.http.get(`${this.url}/download-excel`, {
      responseType: 'blob',
    });
  }

  httpUpdateAdmin(id: number, body: IAdminRequest): Observable<any> {
    return this.http.put(`${this.url}/${id}`, body);
  }

  httpDeleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
