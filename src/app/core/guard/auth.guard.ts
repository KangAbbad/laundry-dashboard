import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { SessionService } from 'src/app/services/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private sessionService: SessionService) {}

  canActivate(): boolean {
    return this.canLoad();
  }

  canLoad(): boolean {
    const result = this.isLogin();
    if (!result) {
      this.router.navigateByUrl('/auth/login');
    }
    return result;
  }

  isLogin(): boolean {
    return this.sessionService.isAdminLogin();
  }
}
