import { Component, DoCheck, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { SessionService } from 'src/app/services/session/session.service';
import { AdminsService } from 'src/app/services/admins/admins.service';
import { IAdmin } from 'src/app/models/IAdmin';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [],
})
export class NavbarComponent implements OnInit, DoCheck {
  private ngUnsubscribe: Subject<any> = new Subject();
  breadcrumbHome!: MenuItem;
  breadcrumbItems: MenuItem[] = [];
  selectedAdmin: IAdmin | undefined;
  isAdminLoading: boolean = false;
  isProfileVisible: boolean = false;

  constructor(
    private title: Title,
    private router: Router,
    private sessionService: SessionService,
    private adminsService: AdminsService
  ) {}

  ngOnInit(): void {
    this.breadcrumbHome = { label: 'Dashboard', routerLink: '/dashboard' };
  }

  ngDoCheck(): void {
    this.breadcrumbItems = [{ label: this.title.getTitle(), disabled: true }];
  }

  onToggleProfileModal(): void {
    const adminInfo = localStorage.getItem('admin_info') ?? null;

    if (!adminInfo) return;

    this.isProfileVisible = !this.isProfileVisible;

    if (this.isProfileVisible) {
      const parseAdminInfo = JSON.parse(adminInfo) as IAdmin;

      this.isAdminLoading = true;

      this.adminsService
        .httpGetAdminDetail(parseAdminInfo.id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(res => {
          const { id_card: idCard, ...rest } = res.data;
          this.selectedAdmin = { ...rest, idCard };
          this.isAdminLoading = false;
        });
    }
  }

  getCredential(): { initialName: string; name: string } {
    const currentSession = this.sessionService.getSession();
    const credentialData = {
      initialName: currentSession.name.charAt(0).toUpperCase(),
      name: currentSession.name,
    };
    return credentialData;
  }

  onLogout(): void {
    this.sessionService.destroySession();
    this.router.navigateByUrl('/auth/login');
  }
}
