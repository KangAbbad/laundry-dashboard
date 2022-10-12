import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IAdminInfo } from 'src/app/models/IAuth';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  constructor(private sessionService: SessionService, private router: Router) {}

  getUserInfo(): IAdminInfo {
    return this.sessionService.getSession();
  }

  onLogout(): void {
    this.sessionService.destroySession();
    this.router.navigateByUrl('/auth/login');
  }
}
