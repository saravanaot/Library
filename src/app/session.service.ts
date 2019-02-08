import { User } from './user.model';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _isLogged = false;
  private loggedUser: User;
  constructor() { }

  get isLogged() {
    return this._isLogged;
  }
  get activeUser() {
    return this.loggedUser;
  }
  get userFullName() {
    if (this._isLogged)
      return this.loggedUser.usr_fname;
    else
      return "";
  }
  set activeUser(value) {
    if (!isNullOrUndefined(value)) {
      this.loggedUser = value;
      this._isLogged = true;
    }
  }
  logOut() {
    this._isLogged = false;
    this.loggedUser = null;
  }

}
