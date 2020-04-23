import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  stompClient = null;

  constructor() { }

  connect() {
      const socket = new SockJS('http://localhost:8080/ws/websocket/');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, frame => {
          console.log('Connected: ' + frame);
          this.stompClient.subscribe('/topic/activity', message => {
            console.log(message.body)
          });
      });
  }

  disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  sendMessage(message) {
      this.stompClient.send("/changeMessage", {}, JSON.stringify(message));
  }
}
