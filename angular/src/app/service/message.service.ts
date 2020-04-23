import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message } from 'src/app/common/message'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>("http://localhost:8080/get")
  }

  sendMessage(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/send")
  }
}
