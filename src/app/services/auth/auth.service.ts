import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { ILoginRequest, IRegisterRequest } from 'src/app/models/IAuth';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  private signinUrl: string = `${environment.baseUrl}/signin`;
  private signupUrl: string = `${environment.baseUrl}/signup`;
  private meUrl: string = `${environment.baseUrl}/me`;

  constructor(private http: HttpClient) {}

  httpCreateLogin(body: ILoginRequest): Observable<Object> {
    return this.http.post(this.signinUrl, body);
  }

  httpCreateRegister(body: IRegisterRequest): Observable<Object> {
    return this.http.post(this.signupUrl, body);
  }

  httpGetUserInfo(): Observable<Object> {
    return this.http.get(this.meUrl);
  }
}
