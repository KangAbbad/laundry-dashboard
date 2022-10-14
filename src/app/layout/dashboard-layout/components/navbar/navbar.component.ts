import { Component, DoCheck, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [],
})
export class NavbarComponent implements OnInit, DoCheck {
  breadcrumbHome!: MenuItem;
  breadcrumbItems: MenuItem[] = [];

  constructor(
    private title: Title,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.breadcrumbHome = { label: 'Dashboard', routerLink: '/dashboard' };
  }

  ngDoCheck(): void {
    this.breadcrumbItems = [{ label: this.title.getTitle(), disabled: true }];
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
