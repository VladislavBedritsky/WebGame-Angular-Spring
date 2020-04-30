import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

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
              private _roomService: RoomService) { }

  ngOnInit(): void {
    this.connect()
  }

  ngOnDestroy(): void {

  }

  navigateToLobby() {
    this._roomService.navigateToLobby();
  }

  connect() {
    this._webSocketService.connect()
  }

  disconnect() {
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
