import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthUser } from 'src/app/common/auth-user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080/registration"
  private userByUsernameUrl = "http://localhost:8080/getUserBy"

  constructor(private _httpClient: HttpClient) { }

  saveUser(authUser) {
    return this._httpClient.post(this.baseUrl, authUser);
  }

  getUserByUsername(username: string) {
    const url = `${this.userByUsernameUrl}/${username}`;
    return this._httpClient.get(url);
  }


}
