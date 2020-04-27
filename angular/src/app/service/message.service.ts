import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from 'src/app/common/message'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private userName: string

  constructor(private http: HttpClient) { }

  getUserName() {
    return this.userName;
  }

  setUserName(userName) {
    this.userName = userName
    console.log(userName)
    console.log(this.userName)
  }
}
