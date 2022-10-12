import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IRegisterRequest } from 'src/app/models/IAuth';

@Injectable({ providedIn: 'root' })
export class AdminsService {
  private adminsUrl: string = `${environment.baseUrl}/admins`;

  constructor(private http: HttpClient) {}

  // httpCreateLogin(body: ILoginRequest): Observable<Object> {
  //   return this.http.post(this.adminsUrl, body);
  // }

  httpCreateAdmin(body: IRegisterRequest): Observable<any> {
    return this.http.post(this.adminsUrl, body);
  }

  httpGetAdminList(): Observable<any> {
    return this.http.get(this.adminsUrl);
  }
}
