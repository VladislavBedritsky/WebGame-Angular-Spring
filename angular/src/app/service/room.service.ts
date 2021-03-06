import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private getRoom = 'https://tomcat.xfarm.xyz/tic-tac-toe/room'

  constructor(private _router: Router,
              private _httpClient: HttpClient) { }

  getRoomById(id: number) {
    const url = `${this.getRoom}/${id}`;
    return this._httpClient.get(url);
  }

  updateAmountOfPeopleInRoomByID(room) {
    const id = room['id']
    const url = `${this.getRoom}/${id}`;
    return this._httpClient.put(url, room);
  }

  navigateToLobby() {
    this._router.navigate(['lobby']);
  }
}
