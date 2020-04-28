import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { User } from 'src/app/common/user'
import { UserService } from 'src/app/service/user.service'

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

  isUserAlreadyExists: boolean = false

  constructor(private _userService: UserService) {}

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

  sendMessage() {
      console.log("calling logout api via web socket");
      this.stompClient.send("/app/auth", {}, JSON.stringify({
        name: this.userName, victory: 0
      }));
  }

  submitUsername():void {
      const body = {id: 1, username: this.userName, password: 'qq', active: 1 };
      this._userService.getUserByUsername(this.userName).subscribe(
        data => {

          if (data === null) {
            this._userService.saveUser(body).subscribe(
              data => {
                this._userService.authenticate(data['username'], data['password']).subscribe(
                  data => {
                    if(data['authenticated'] === true) {
                      this._userService.navigateToGame()
                    }
                  }
                )
              }
            )
            this.isUserAlreadyExists = false;

          } else {
            this.isUserAlreadyExists = true;
          }

        }
      )
  }


}
