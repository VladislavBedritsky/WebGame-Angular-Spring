import { Component, OnInit } from '@angular/core';

import { Message } from 'src/app/common/message'
import { MessageService } from 'src/app/service/message.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages: Message[];
  processing = false;

  constructor(private _messageService: MessageService) { }

  ngOnInit(): void {
    this.processing = false
  }

  getAll() {
    this._messageService.sendMessage();
    this._messageService.getMessages()
                .subscribe(
                  messages => {
                    this.messages = messages;
                    console.log(this.messages);
                  }
                );

console.log(this.messages);
    return this.messages;
  }

}
