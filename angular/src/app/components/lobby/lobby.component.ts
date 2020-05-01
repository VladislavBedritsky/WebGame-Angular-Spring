import { Component, OnInit } from '@angular/core';
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
  messageMapping: string = '/app/lobby'
  users: string[] = []

  amountOfPeopleInRoom1: number = 0
  isRoom1Full: boolean = false

  selectedU: any

  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(private _router: Router,
              public _webSocketService: WebsocketService,
              private _roomService: RoomService,
              private _userService: UserService) {

    this.username = sessionStorage.getItem('username')

  }

  ngOnInit(): void {
    this.getUsers()
  }

  q1(user: any) {
    this.selectedU = user
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

  joinRoom1() {
    this._roomService.getRoomById(1).subscribe(
        data => {
             var amountOfPeople = data['amountOfPeople'];
             if (amountOfPeople === 2) {
                this.isRoom1Full = true
                this.amountOfPeopleInRoom1 = 2
                this._router.navigate(['lobby']);
             } else {
                this._router.navigate(['room1']);
             }
        });
  }

  definePreviousUrl() {
    this.currentUrl = this._router.url;
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;

        if(this.previousUrl === '/room1') {
         console.log('/room1')
        }
      };
    });

  }

  getAmountOfPeopleInRoom1() {
    this._roomService.getRoomById(1).subscribe(
      data => {
        this.amountOfPeopleInRoom1 = data['amountOfPeople']
        if (this.amountOfPeopleInRoom1 === 2) {
          this.isRoom1Full = true
        } else {
          this.isRoom1Full = false
        }
      }
    )
  }

}
