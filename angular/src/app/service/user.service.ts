import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://35.239.53.104:8087/web-1.01/registration"
  private getUserByUsernameUrl = "http://35.239.53.104:8087/web-1.01/getUserBy"
  private deleteUserByUsernameUrl = "http://35.239.53.104:8087/web-1.01/deleteUserBy"
  private userAuthenticationUrl = "http://35.239.53.104:8087/web-1.01/user"
  private getAllUsers = "http://35.239.53.104:8087/web-1.01/users"

  constructor(private _httpClient: HttpClient,
              private _router: Router) { }

  saveUser(authUser) {
    return this._httpClient.post(this.baseUrl, authUser);
  }

  getUsers(): Observable<string[]> {
    return this._httpClient.get<string[]>(this.getAllUsers);
  }

  getUserByUsername(username: string) {
    const url = `${this.getUserByUsernameUrl}/${username}`;
    return this._httpClient.get(url);
  }

  getPrincipal() {
    return this._httpClient.get(this.userAuthenticationUrl);
  }

  deleteUser() {
    let username = sessionStorage.getItem('username')
    const url = `${this.deleteUserByUsernameUrl}/${username}`;
    return this._httpClient.delete(url);
  }

  authenticate(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this._httpClient.get(this.userAuthenticationUrl, {headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username', username);
        let authString = 'Basic ' + btoa(username + ':' + password);
        sessionStorage.setItem('basicAuth', authString);
        return userData;
       }
     )
    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

  navigateToLobby() {
    this._router.navigate(['lobby']);
  }


}
