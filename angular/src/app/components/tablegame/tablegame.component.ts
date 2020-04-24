import { Component, OnInit } from '@angular/core';

import { ButtonService } from 'src/app/service/button.service'

@Component({
  selector: 'app-tablegame',
  templateUrl: './tablegame.component.html',
  styleUrls: ['./tablegame.component.css']
})
export class TablegameComponent implements OnInit {

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

  constructor(private _buttonService: ButtonService) { }

  ngOnInit(): void {
  }

  markOClick() {
    this.userChoiceIs0 = true;
    this.marksArePicked = true;
  }

  markXClick() {
    this.userChoiceIsX = true;
    this.marksArePicked = true;
  }

  button1Click(): void {
        if(this.userChoiceIs0 == true) {
          this.button1 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button1 = 'X'
        }
        this.checkIfGameIsOver();
  }

  button2Click() {
        if(this.userChoiceIs0 == true) {
          this.button2 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button2 = 'X'
        }
        this.checkIfGameIsOver();
  }

  button3Click() {
        if(this.userChoiceIs0 == true) {
          this.button3 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button3 = 'X'
        }
        this.checkIfGameIsOver();
  }

  button4Click() {
        if(this.userChoiceIs0 == true) {
          this.button4 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button4 = 'X'
        }
        this.checkIfGameIsOver();
  }

  button5Click() {
        if(this.userChoiceIs0 == true) {
          this.button5 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button5 = 'X'
        }
        this.checkIfGameIsOver();
  }

  button6Click() {
        if(this.userChoiceIs0 == true) {
          this.button6 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button6 = 'X'
        }
        this.checkIfGameIsOver();
  }

  button7Click() {
        if(this.userChoiceIs0 == true) {
          this.button7 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button7 = 'X'
        }
        this.checkIfGameIsOver();
  }

  button8Click() {
        if(this.userChoiceIs0 == true) {
          this.button8 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button8 = 'X'
        }
        this.checkIfGameIsOver();
  }

  button9Click() {
        if(this.userChoiceIs0 == true) {
          this.button9 = '0'
        }
        if(this.userChoiceIsX == true) {
          this.button9 = 'X'
        }
        this.checkIfGameIsOver();
  }

  checkIfGameIsOver() {
      if (this.button1 === this.button2 && this.button2 === this.button3 ) {
        this.victoryButton = this.button1;
        this.isGameOver = true;
      }
      if (this.button1 === this.button4 && this.button4 === this.button7 ) {
        this.victoryButton = this.button1;
        this.isGameOver = true;
      }
      if (this.button3 === this.button6 && this.button6 === this.button9 ) {
        this.victoryButton = this.button3;
        this.isGameOver = true;
      }
      if (this.button7 === this.button8 && this.button8 === this.button9 ) {
        this.victoryButton = this.button7;
        this.isGameOver = true;
      }
      if (this.button2 === this.button5 && this.button5 === this.button8 ) {
        this.victoryButton = this.button2;
        this.isGameOver = true;
      }
      if (this.button4 === this.button5 && this.button5 === this.button6 ) {
        this.victoryButton = this.button4;
        this.isGameOver = true;
      }
      if (this.button1 === this.button5 && this.button5 === this.button9 ) {
        this.victoryButton = this.button1;
        this.isGameOver = true;
      }
      if (this.button3 === this.button5 && this.button5 === this.button7 ) {
        this.victoryButton = this.button3;
        this.isGameOver = true;
      }
  }

}
