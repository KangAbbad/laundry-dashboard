import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { SessionService } from './services/session/session.service';
import { LayoutModule } from './layout/layout.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AdminsService } from './services/admins/admins.service';

@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthService,
    SessionService,
    AdminsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
