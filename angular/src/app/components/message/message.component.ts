import { Component, OnInit } from '@angular/core';

import { Message } from 'src/app/common/message'
import { MessageService } from 'src/app/service/message.service'
import { WsService } from 'src/app/service/ws.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages: Message[];
  processing = false;

  constructor(private _messageService: MessageService,
              private _wsService: WsService) { }

  ngOnInit(): void {
    this.processing = false
    this._wsService.connect()
  }

  getAll() {
    this._messageService.sendMessage()
                    .subscribe(
                      message => {
                        console.log(message);
                      }
                    );
    this._messageService.getMessages()
                .subscribe(
                  messages => {
                    this.messages = messages;
                    this.processing = true;
                        console.log(this.messages);
                        console.log(this.processing);
                  }
                );
  }

}
