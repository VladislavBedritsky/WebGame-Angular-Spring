import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { Message } from 'src/app/common/message'
import { MessageService } from 'src/app/service/message.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages: Message[];
  processing = false;

  greeting: Message;
  userName: string;
  content: any;

  webSocketEndPoint: string = 'http://localhost:8080/websocket';
  topic: string = '/topic/activity';
  stompClient: any;

  constructor(private _messageService: MessageService) {}

  ngOnInit(): void {
    this.processing = false;
  }

  connect() {
      const socket = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, frame => {
          console.log('Connected: ' + frame);
          this.stompClient.subscribe(this.topic, message => {
              this.greeting = JSON.parse(message.body)
              this.content = this.greeting.content
          });
      });
  }

  disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  sendMessage() {
      console.log("calling logout api via web socket");
      this.stompClient.send("/app/hello", {}, JSON.stringify(this.userName));
  }

  getAll() {
    this._messageService.sendMessage()
                    .subscribe(
                      message => {
                        console.log(message);
                      }
                    );
    this._messageService.getMessages()
                .subscribe(

                  messages => {
                    this.messages = messages;
                    this.processing = true;
                        console.log(this.messages);
                        console.log(this.processing);
                  }
                );
  }
}
