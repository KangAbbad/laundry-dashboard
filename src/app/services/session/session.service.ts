import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { IAdminInfo } from 'src/app/models/IAuth';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  createSession(adminInfo: IAdminInfo): void {
    localStorage.setItem('admin_info', JSON.stringify(adminInfo));
  }

  getSession(): any {
    return JSON.parse(localStorage.getItem('admin_info') as string);
  }

  getToken(): any {
    return localStorage.getItem('access_token');
  }

  isAdminLogin(): boolean {
    const authToken = localStorage.getItem('access_token');
    return authToken ? true : false;
  }

  getEmail(): Observable<string> {
    const email = this.getSession()?.data;
    return of(email);
  }

  destroySession(): void {
    localStorage.clear();
  }
}
