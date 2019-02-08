import { Book } from './book.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

export interface DataObj {
  Users: User[];
  Books: Book[];
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private libData: DataObj;
  isDataLoaded: boolean;
  private _loginError: string;

  constructor() {
    try {
      //Getting data from local json file (should be API)
      let json: JSON = require("./../assets/data.json");

      //Parsing string data against data models
      this.libData = JSON.parse(JSON.stringify(json));

      //setting flags
      this.isDataLoaded = true;
    }
    catch (err) {
      this._loginError = 'AppError';
      console.log(`Error: Loading / Parsing data:==> ${err.message}`);
    }
  }
  get loginError() {
    return this._loginError;
  }
  checkLogin(_reportedUser: User): User {

    //If there is error in loading/parsing data, reply with null and keep error flag
    if (!this.isDataLoaded) return null;

    //reset error flag
    this._loginError = null;
    let loggedUser: User;

    let _usr: User = this.libData.Users.filter(x => x.usr_email == _reportedUser.usr_email)[0];

    if (!isNullOrUndefined(_usr)) {
      if (_usr.usr_password == _reportedUser.usr_password) loggedUser = _usr;
      else this._loginError = "PassMismatch";
    }
    else {
      this._loginError = "NoUser";
    }

    return loggedUser;
  }

  get Library(): DataObj {
    return this.libData;
  }
}
