import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd  } from '@angular/router';

import { WebsocketService } from 'src/app/service/websocket.service'
import { RoomService } from 'src/app/service/room.service'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  username: string
  messageMapping: string = '/app/lobby'

  amountOfPeopleInRoom1: number = 0
  isRoom1Full: boolean = false

  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(private _router: Router,
              public _webSocketService: WebsocketService,
              private _roomService: RoomService) {

    this.username = sessionStorage.getItem('username')

  }

  ngOnInit(): void {
    this.getAmountOfPeopleInRoom1()
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
