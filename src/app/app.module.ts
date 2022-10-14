import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { SessionService } from './services/session/session.service';
import { LayoutModule } from './layout/layout.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AdminsService } from './services/admins/admins.service';
import { HttpInterceptorInterceptor } from './core/interceptor/http-interceptor.interceptor';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    },
    AuthService,
    SessionService,
    AdminsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
