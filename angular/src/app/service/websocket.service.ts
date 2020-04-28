import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { Message } from 'src/app/common/message'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  button1: string = "1"
  button2: string = "2"
  button3: string = "3"
  button4: string = "4"
  button5: string = "5"
  button6: string = "6"
  button7: string = "7"
  button8: string = "8"
  button9: string = "9"
  victoryButton: string

  userChoiceIs0: boolean = false;
  userChoiceIsX: boolean = false;

  marksArePicked: boolean = false;

  isGameOver: boolean = false;

  stompClient: any;
  webSocketEndPoint: string = 'http://localhost:8080/websocket';
  topic: string = '/topic/activity';
  message: Message;

  constructor() { }

  connect() {
      const socket = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, frame => {
          console.log('Connected: ' + frame);
          this.stompClient.subscribe(this.topic, data => {
              this.message = JSON.parse(data.body)
              if (this.message.buttonName === 'b1' ) {
                this.button1 = this.message.content
              } else if (this.message.buttonName === 'b2' ) {
                this.button2 = this.message.content
              } else if (this.message.buttonName === 'b3' ) {
                this.button3 = this.message.content
              } else if (this.message.buttonName === 'b4' ) {
                this.button4 = this.message.content
              } else if (this.message.buttonName === 'b5' ) {
                this.button5 = this.message.content
              } else if (this.message.buttonName === 'b6' ) {
                this.button6 = this.message.content
              } else if (this.message.buttonName === 'b7' ) {
                this.button7 = this.message.content
              } else if (this.message.buttonName === 'b8' ) {
                this.button8 = this.message.content
              } else if (this.message.buttonName === 'b9' ) {
                this.button9 = this.message.content
              } else if (this.message.buttonName === 'gameOver') {
                this.victoryButton = this.message.content
                this.isGameOver = true
              } else if (this.message.buttonName === 'restartGame') {
                 this.setValuesAfterRestart()
              } else if (this.message.buttonName === 'markOClick') {
                if (!this.userChoiceIs0) {
                  this.userChoiceIsX = true;
                  this.marksArePicked = true;
                }
              } else if (this.message.buttonName === 'markXClick') {
                if (!this.userChoiceIsX) {
                  this.userChoiceIs0 = true;
                  this.marksArePicked = true;
                }
              }

          });
      });
  }

  disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  markOClick(messageMapping: string) {
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : 'userChoice', buttonName : 'markOClick'
          }));
        this.userChoiceIs0 = true;
        this.marksArePicked = true;
  }

  markXClick(messageMapping: string) {
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : 'userChoice', buttonName : 'markXClick'
          }));
        this.userChoiceIsX = true;
        this.marksArePicked = true;
  }

  button1Click(messageMapping: string): void {
        if(this.userChoiceIs0 == true) {
          this.button1 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button1 = 'X'
        }

        this.checkIfGameIsOver(messageMapping);
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : this.button1, buttonName : 'b1'
          }));
  }

  button2Click(messageMapping: string) {
        if(this.userChoiceIs0 == true) {
          this.button2 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button2 = 'X'
        }

        this.checkIfGameIsOver(messageMapping);
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : this.button2, buttonName : 'b2'
          }));
  }

  button3Click(messageMapping: string) {
        if(this.userChoiceIs0 == true) {
          this.button3 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button3 = 'X'
        }

        this.checkIfGameIsOver(messageMapping);
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : this.button3, buttonName : 'b3'
          }));
  }

  button4Click(messageMapping: string) {
        if(this.userChoiceIs0 == true) {
          this.button4 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button4 = 'X'
        }

        this.checkIfGameIsOver(messageMapping);
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : this.button4, buttonName : 'b4'
          }));
  }

  button5Click(messageMapping: string) {
        if(this.userChoiceIs0 == true) {
          this.button5 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button5 = 'X'
        }

        this.checkIfGameIsOver(messageMapping);
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : this.button5, buttonName : 'b5'
          }));
  }

  button6Click(messageMapping: string) {
        if(this.userChoiceIs0 == true) {
          this.button6 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button6 = 'X'
        }

        this.checkIfGameIsOver(messageMapping);
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : this.button6, buttonName : 'b6'
          }));
  }

  button7Click(messageMapping: string) {
        if(this.userChoiceIs0 == true) {
          this.button7 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button7 = 'X'
        }

        this.checkIfGameIsOver(messageMapping);
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : this.button7, buttonName : 'b7'
          }));
  }

  button8Click(messageMapping: string) {
        if(this.userChoiceIs0 == true) {
          this.button8 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button8 = 'X'
        }

        this.checkIfGameIsOver(messageMapping);
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : this.button8, buttonName : 'b8'
          }));
  }

  button9Click(messageMapping: string) {
        if(this.userChoiceIs0 == true) {
          this.button9 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button9 = 'X'
        }

        this.checkIfGameIsOver(messageMapping);
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : this.button9, buttonName : 'b9'
          }));
  }

  checkIfGameIsOver(messageMapping: string) {
      if (this.button1 === this.button2 && this.button2 === this.button3 ) {
        this.sendMessageIfGameIsOver(this.button1, messageMapping);
      }
      if (this.button1 === this.button4 && this.button4 === this.button7 ) {
        this.sendMessageIfGameIsOver(this.button1, messageMapping);
      }
      if (this.button3 === this.button6 && this.button6 === this.button9 ) {
        this.sendMessageIfGameIsOver(this.button3, messageMapping);
      }
      if (this.button7 === this.button8 && this.button8 === this.button9 ) {
        this.sendMessageIfGameIsOver(this.button7, messageMapping);
      }
      if (this.button2 === this.button5 && this.button5 === this.button8 ) {
        this.sendMessageIfGameIsOver(this.button2, messageMapping);
      }
      if (this.button4 === this.button5 && this.button5 === this.button6 ) {
        this.sendMessageIfGameIsOver(this.button4, messageMapping);
      }
      if (this.button1 === this.button5 && this.button5 === this.button9 ) {
        this.sendMessageIfGameIsOver(this.button1, messageMapping);
      }
      if (this.button3 === this.button5 && this.button5 === this.button7 ) {
        this.sendMessageIfGameIsOver(this.button3, messageMapping);
      }
  }

  sendMessageIfGameIsOver(button: string, messageMapping: string) {
        this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : button, buttonName : 'gameOver'
          }));
  }

  restartGame(messageMapping: string) {
      this.stompClient.send(messageMapping, {}, JSON.stringify({
          content : '', buttonName : 'restartGame'
          }));
  }

  setValuesAfterRestart() {
      this.button1 = "1"
      this.button2 = "2"
      this.button3 = "3"
      this.button4 = "4"
      this.button5 = "5"
      this.button6 = "6"
      this.button7 = "7"
      this.button8 = "8"
      this.button9 = "9"
      this.victoryButton = ""

      this.userChoiceIs0 = false;
      this.userChoiceIsX = false;
      this.marksArePicked = false;
      this.isGameOver = false;
  }

}
