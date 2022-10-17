import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, delay, of } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { MessageService } from 'primeng/api';

import { IAdminInfo } from 'src/app/models/IAuth';
import { SessionService } from 'src/app/services/session/session.service';
import { environment } from 'src/environments/environment';
import { StompService } from 'src/app/services/stomp/stomp.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {
  websocket$: WebSocketSubject<any> | undefined;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private stompService: StompService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // this.onStartWs();
    this.stompService.subscribe('/topic/messages', (event: any): any => {
      const wsBody = JSON.parse(event.body);
      this.onToggleMessageTransaction(wsBody);
    });
  }

  onStartWs(): void {
    this.websocket$ = webSocket(environment.wsUrl);
    // this.websocket$ = webSocket('ws://localhost:8080');

    // this.websocket$.subscribe({
    //   next: msg => console.log('message received: ' + msg),
    //   error: err => console.log(err),
    //   complete: () => console.log('complete'),
    // });

    this.websocket$.pipe(concatMap(item => of(item).pipe(delay(1000)))).subscribe((res: any) => {
      console.log('websocket');
      console.log(res);
    });

    this.websocket$ = webSocket({
      url: environment.wsUrl,
      serializer: val => JSON.stringify({ channel: '', val }),
    });
  }

  onToggleMessageTransaction(body: { type: ''; title: ''; description: '' }): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Websocket Notification',
      detail: `${body.title} - ${body.description}`,
      life: 5000,
    });
  }

  getUserInfo(): IAdminInfo {
    return this.sessionService.getSession();
  }

  onLogout(): void {
    this.sessionService.destroySession();
    this.router.navigateByUrl('/auth/login');
  }
}
