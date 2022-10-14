import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IRegisterRequest } from 'src/app/models/IAuth';

@Injectable({ providedIn: 'root' })
export class AdminsService {
  private adminsUrl: string = `${environment.baseUrl}/admins`;

  constructor(private http: HttpClient) {}

  httpCreateAdmin(body: IRegisterRequest): Observable<any> {
    return this.http.post(this.adminsUrl, body);
  }

  httpGetAdmins(): Observable<any> {
    return this.http.get(this.adminsUrl);
  }

  httpGetAdminDetail(id: number): Observable<any> {
    return this.http.get(`${this.adminsUrl}/${id}`);
  }
}
