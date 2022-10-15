import { Component } from '@angular/core';

import { defaultRouterLinkActiveOptions, INavigationMenu } from './ISidebar';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  navigations: INavigationMenu[] = [
    {
      url: '/dashboard',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {},
      icon: 'pi pi-home',
      title: 'Homepage',
    },
    {
      url: '/dashboard/transactions',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-chart-bar',
      title: 'Transactions',
    },
    {
      url: '/dashboard/admins',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-users',
      title: 'Admins',
    },
  ];

  constructor() {}
}
