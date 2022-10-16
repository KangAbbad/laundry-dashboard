import { StompService } from './../../services/stomp/stomp.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { concatMap, delay, Observable, of } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { IAdminInfo } from 'src/app/models/IAuth';
import { SessionService } from 'src/app/services/session/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {
  websocket$: WebSocketSubject<any> | undefined;

  constructor(private sessionService: SessionService, private router: Router, private stompService: StompService) {}

  ngOnInit(): void {
    // this.startWs();
    this.stompService.subscribe('/topic/messages', (): any => {
      console.log('stompService run');
    });
  }

  startWs(): void {
    this.websocket$ = webSocket(environment.wsUrl);

    this.websocket$.subscribe({
      next: msg => console.log('message received: ' + msg),
      error: err => console.log(err),
      complete: () => console.log('complete'),
    });

    // this.websocket$.pipe(concatMap(item => of(item).pipe(delay(1000)))).subscribe((res: any) => {
    //   console.log('websocket');
    //   console.log(res);
    // });

    // this.websocket$ = webSocket({
    //   url: environment.wsUrl,
    //   serializer: val => JSON.stringify({ channel: '/topic/messages', val }),
    // });

    // this.websocket$.subscribe({
    //   next: msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
    //   error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    //   complete: () => console.log('complete'), // Called when connection is closed (for whatever reason).
    // });
  }

  getUserInfo(): IAdminInfo {
    return this.sessionService.getSession();
  }

  onLogout(): void {
    this.sessionService.destroySession();
    this.router.navigateByUrl('/auth/login');
  }
}
