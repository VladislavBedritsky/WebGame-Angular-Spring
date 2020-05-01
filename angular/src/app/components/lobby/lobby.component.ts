import { Component, OnInit} from '@angular/core';
import { Router, RouterEvent, NavigationEnd  } from '@angular/router';

import { WebsocketService } from 'src/app/service/websocket.service'
import { RoomService } from 'src/app/service/room.service'
import { UserService } from 'src/app/service/user.service'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  username: string
  messageMapping: string
  users: string[] = []
  isPlayerPicked: boolean = false
  topic: string = '/topic/'

  constructor(private _router: Router,
              public _webSocketService: WebsocketService,
              private _userService: UserService) {

    this.username = sessionStorage.getItem('username')

  }

  ngOnInit(): void {
    this.getUsers()
  }

  connectToUser(usernameFromUI: any) {
    this._webSocketService.setValuesAfterRestart()

    if(this.username.localeCompare(usernameFromUI) === -1) {
      this.messageMapping = this.username.concat(usernameFromUI)
    } else {
      this.messageMapping = usernameFromUI.concat(this.username)
    }

    const finalTopic = this.topic.concat(this.messageMapping);
    this.isPlayerPicked = true
    this._webSocketService.connect(finalTopic)

  }

  getUsers() {
    this._userService.getUsers().subscribe(
      data => {
          this.users = data;
          for (let i=0; i < this.users.length; i++) {
            if (this.users[i]['username'] === this.username) {
              data.splice(i,1)
            }
          }
      }
    )
  }


}
