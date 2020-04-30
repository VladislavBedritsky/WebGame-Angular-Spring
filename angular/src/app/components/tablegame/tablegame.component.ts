import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Router, RouterEvent, NavigationEnd  } from '@angular/router';

import { Message } from 'src/app/common/message'
import { WebsocketService } from 'src/app/service/websocket.service'
import { RoomService } from 'src/app/service/room.service'

@Component({
  selector: 'app-tablegame',
  templateUrl: './tablegame.component.html',
  styleUrls: ['./tablegame.component.css']
})
export class TablegameComponent implements OnInit, OnDestroy {

  username: string = sessionStorage.getItem('username')
  messageMapping: string = '/app/room1'

  usersInRoom: number = 0

  constructor(public _webSocketService: WebsocketService,
              private _roomService: RoomService,
              private _router: Router) { }

  ngOnInit(): void {
    this.connect()
  }

  ngOnDestroy(): void {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
     // this.disconnect()
   $event.returnValue = true
       console.log('d')
       }


  decreaseAmountOfPeople(id: number) {
    this._roomService.getRoomById(id).subscribe(
        data => {
             var amountOfPeople = data['amountOfPeople'] - 1;
             const body = {id: id, name: 'room1', amountOfPeople: amountOfPeople };
             this._roomService.updateAmountOfPeopleInRoomByID(body).subscribe()
        });
  }

  increaseAmountOfPeopleInRoomByID(id: number) {
    this._roomService.getRoomById(id).subscribe(
        data => {
             var amountOfPeople = data['amountOfPeople'] + 1;
             const body = {id: id, name: 'room1', amountOfPeople: amountOfPeople };
             this._roomService.updateAmountOfPeopleInRoomByID(body).subscribe()
        });
  }

  navigateToLobby() {
    this._roomService.navigateToLobby();
  }

  connect() {
    this.increaseAmountOfPeopleInRoomByID(1)
    this._webSocketService.connect()
  }

  disconnect() {
    this.decreaseAmountOfPeople(1)
    this._webSocketService.disconnect()
  }

  markOClick() {
    this._webSocketService.markOClick(this.messageMapping)
  }

  markXClick() {
    this._webSocketService.markXClick(this.messageMapping)
  }


  button1Click(): void {
    this._webSocketService.button1Click(this.messageMapping)
  }

  button2Click() {
    this._webSocketService.button2Click(this.messageMapping)
  }

  button3Click() {
    this._webSocketService.button3Click(this.messageMapping)
  }

  button4Click() {
    this._webSocketService.button4Click(this.messageMapping)
  }

  button5Click() {
    this._webSocketService.button5Click(this.messageMapping)
  }

  button6Click() {
    this._webSocketService.button6Click(this.messageMapping)
  }

  button7Click() {
    this._webSocketService.button7Click(this.messageMapping)
  }

  button8Click() {
    this._webSocketService.button8Click(this.messageMapping)
  }

  button9Click() {
    this._webSocketService.button9Click(this.messageMapping)
  }

  checkIfGameIsOver() {
    this._webSocketService.checkIfGameIsOver(this.messageMapping)
  }

  restartGame() {
    this._webSocketService.restartGame(this.messageMapping)
  }

  setValuesAfterRestart() {
    this._webSocketService.setValuesAfterRestart()
  }



}
