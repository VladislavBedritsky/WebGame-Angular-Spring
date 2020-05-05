import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Router, RouterEvent, NavigationEnd  } from '@angular/router';

import { Message } from 'src/app/common/message'
import { WebsocketService } from 'src/app/service/websocket.service'
import { UserService } from 'src/app/service/user.service'

@Component({
  selector: 'app-tablegame',
  templateUrl: './tablegame.component.html',
  styleUrls: ['./tablegame.component.css']
})
export class TablegameComponent implements OnInit, OnDestroy {


  username: string = sessionStorage.getItem('username')
  topic: string = '/app/'
  @Input() messageMapping: string
  @Input() rivalPlayer: string

  usersInRoom: number = 0

  constructor(public _webSocketService: WebsocketService,
              private _router: Router,
              private _userService: UserService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.disconnect()
  }

  disconnect() {
    this._webSocketService.disconnect()
  }

  markOClick() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.markOClick(finalTopic)
  }

  markXClick() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.markXClick(finalTopic)
  }

  button1Click(): void {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.button1Click(finalTopic)
  }

  button2Click() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.button2Click(finalTopic)
  }

  button3Click() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.button3Click(finalTopic)
  }

  button4Click() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.button4Click(finalTopic)
  }

  button5Click() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.button5Click(finalTopic)
  }

  button6Click() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.button6Click(finalTopic)
  }

  button7Click() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.button7Click(finalTopic)
  }

  button8Click() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.button8Click(finalTopic)
  }

  button9Click() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.button9Click(finalTopic)
  }

  checkIfGameIsOver() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.checkIfGameIsOver(finalTopic)
  }

  restartGame() {
    const finalTopic = this.topic.concat(this.messageMapping)
    this._webSocketService.restartGame(finalTopic)
  }



}
