import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private _router: Router,
              public _webSocketService: WebsocketService,
              private _roomService: RoomService) {
    this.username = sessionStorage.getItem('username')
  }

  ngOnInit(): void {
    this._webSocketService.connect()
  }

  joinRoom1() {
     this.updateAmountOfPeopleInRoomByID(1)
     this._router.navigate(['room1']);
  }

  updateAmountOfPeopleInRoomByID(id: number) {
    this._roomService.getRoomById(1).subscribe(
        data => {
             var amountOfPeople = data['amountOfPeople']+1;
             console.log(amountOfPeople)
             const body = {id: id, name: 'room1', amountOfPeople: amountOfPeople };
             this._roomService.updateAmountOfPeopleInRoomByID(body).subscribe()
        });
  }

}
