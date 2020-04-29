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

  amountOfPeopleInRoom1: number
  isRoom1Full: boolean = false
  username: string
  messageMapping: string = '/app/lobby'

  constructor(private _router: Router,
              public _webSocketService: WebsocketService,
              private _roomService: RoomService) {
    this.username = sessionStorage.getItem('username')
  }

  ngOnInit(): void {
    this._webSocketService.connect()
    this.getAmountOfPeopleInRoom1(1)
  }

  joinRoom1() {
     this.updateAmountOfPeopleInRoomByID(1)
     this._router.navigate(['room1']);
  }

  updateAmountOfPeopleInRoomByID(id: number) {
    const body = {id: id, name: 'room1', amountOfPeople: this.amountOfPeopleInRoom1++ };
    this._roomService.updateAmountOfPeopleInRoomByID(body).subscribe(
      data => console.log(data)
    )
  }

  getAmountOfPeopleInRoom1(id: number) {
    this._roomService.getRoomById(id).subscribe(
        data => {
              console.log(data['amountOfPeople'])
              this.amountOfPeopleInRoom1 = data['amountOfPeople']
        });
                      console.log(this.amountOfPeopleInRoom1)
  }

}
