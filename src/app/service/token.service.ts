import { Injectable } from '@angular/core';

const TOKEN_KEY = "Authtoken";
const USERNAME_KEY = "AuthUserName";

@Injectable({
  providedIn: 'root',
})

export class TokenService {
  constructor() {}

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY)
  }

  public setUserName(username: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUserName() {
    if(sessionStorage.getItem(USERNAME_KEY) == null){
      return ""
    } else {
      return sessionStorage.getItem(USERNAME_KEY)
    }
  }

  public logOut(): void {
    sessionStorage.clear();
  }
}
