import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MegaMenuModule } from 'primeng/megamenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { SidebarComponent } from './dashboard-layout/components/sidebar/sidebar.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { NavbarComponent } from './dashboard-layout/components/navbar/navbar.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    AuthLayoutComponent,
    SidebarComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    DividerModule,
    BreadcrumbModule,
    AvatarModule,
    AvatarGroupModule,
    MegaMenuModule,
    OverlayPanelModule,
    ButtonModule,
  ],
  exports: [DashboardLayoutComponent, AuthLayoutComponent],
})
export class LayoutModule {}
