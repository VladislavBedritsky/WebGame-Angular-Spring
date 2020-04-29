import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:8080/registration"
  private getUserByUsernameUrl = "http://localhost:8080/getUserBy"
  private deleteUserByUsernameUrl = "http://localhost:8080/deleteUserBy"
  private userAuthenticationUrl = "http://localhost:8080/user"

  constructor(private _httpClient: HttpClient,
              private _router: Router) { }

  saveUser(authUser) {
    return this._httpClient.post(this.baseUrl, authUser);
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
    this.deleteUser().subscribe()
    sessionStorage.removeItem('username')
  }

  navigateToGame() {
    this._router.navigate(['lobby']);
  }

}
