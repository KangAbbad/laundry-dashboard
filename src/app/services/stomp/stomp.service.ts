import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { over } from 'stompjs';

@Injectable({ providedIn: 'root' })
export class StompService {
  socket = new SockJS('http://localhost:8080/chat');
  stompClient = over(this.socket);

  subscribe(topic: string, callback: any): void {
    const connected: boolean = this.stompClient.connected;
    if (connected) {
      this.subscribeToTopic(topic, callback);
      return;
    }

    this.stompClient.connect({}, (): any => {
      this.subscribeToTopic(topic, callback);
    });
  }

  private subscribeToTopic(topic: string, callback: any): void {
    this.stompClient.subscribe(topic, (event: any): any => {
      callback(event);
    });
  }
}
