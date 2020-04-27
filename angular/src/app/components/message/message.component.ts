import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Observable } from "rxjs";

import { User } from 'src/app/common/user'
import { MessageService } from 'src/app/service/message.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  user: User;
  userName: string;

  webSocketEndPoint: string = 'http://localhost:8080/websocket';
  topic: string = '/topic/activity';
  stompClient: any;

  constructor(private _messageService: MessageService) {}

  ngOnInit(): void {
  }

  connect() {
      const socket = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, frame => {
          console.log('Connected: ' + frame);
          this.stompClient.subscribe(this.topic, data => {
              this.user = JSON.parse(data.body)
              this.userName = this.user.name
          });
      });
  }

  disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  submitUsername() {
    this._messageService.setUserName(this.userName)
  }

  sendMessage() {
      console.log("calling logout api via web socket");
      this.stompClient.send("/app/auth", {}, JSON.stringify({
        name: this.userName, victory: 0
      }));
  }

}
