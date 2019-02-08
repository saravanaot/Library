import { LoginService } from './../login.service';
import { SessionService } from './../session.service';
import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { User } from '../user.model';
import { Route, Router } from '@angular/router';

export enum LoginErrors {
  InvalidEmail,
  EmptyField,
  NoAccount,
  PassMismatch,
  InternalError
}
 
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})



export class LoginPageComponent implements OnInit {
  config: any;
  userEmail: string;
  userPassword: string;
  isEmailError: boolean;
  isPasswordError: boolean;
  isLoginError: boolean;
  loginErrMsg: string;

  constructor(private navRouter: Router, public sessionService: SessionService, public loginService: LoginService) {
    /*
        var one_day = 1000 * 60 * 60 * 24;
        var date1 = new Date(config.Books[0].b_withdrawn);
        var date2 = new Date(Date.now());
    
        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
    
        console.log(`The name is:${Math.round(difference_ms/one_day)}`);
        */
  }
  private resetErrors() {
    this.isLoginError = false;
    this.loginErrMsg = null;
  }
  private displayError(err: LoginErrors) {

    this.loginErrMsg = "Internal Error(3453)!";

    switch (err) {
      case LoginErrors.EmptyField:
        this.loginErrMsg = "Do not leave empty field";
        break;
      case LoginErrors.InvalidEmail:
        this.loginErrMsg = "Please enter valid email";
        break;
      case LoginErrors.NoAccount:
        this.loginErrMsg = "No account with the email specified!";
        break;
      case LoginErrors.PassMismatch:
        this.loginErrMsg = "Incorrect password!";
        break;
      case LoginErrors.InternalError:
        this.loginErrMsg = "Internl Error!, contact Admin";
        break;
    }
    this.isLoginError = true;
  }

  ngOnInit() {
    //this.config = config;
  }

  onLogin() {
    //reset flags
    this.resetErrors();

    //Validation
    //basic empty fields
    if (isNullOrUndefined(this.userEmail) || this.userEmail.trim().length <= 0) {
      this.isEmailError = true;
    }
    if (isNullOrUndefined(this.userPassword)) {
      this.isPasswordError = true;
    }
    if (this.isEmailError || this.isPasswordError) {
      this.displayError(LoginErrors.EmptyField);
      return;
    }

    //Constructing User object
    let _user = new User(null, this.userEmail.trim(), this.userPassword);

    //Validating user through validation service
    let response: User = this.loginService.checkLogin(_user);

    if (!isNullOrUndefined(response)) {

      //Login success
      //save user in a session
      this.sessionService.activeUser = response;
      //navigate to next page
      this.navRouter.navigate(['users']);

    }
    else {
      //display error to client
      let errormsg: string = this.loginService.loginError;
      switch (errormsg) {
        case 'AppError':
          this.displayError(LoginErrors.InternalError);
          break;
        case 'NoUser':
          this.displayError(LoginErrors.NoAccount);
          break;
        case 'PassMismatch':
          this.displayError(LoginErrors.PassMismatch);
          break;
      }
    }
  }
  onLogOut()
  {
    this.sessionService.logOut();
    this.navRouter.navigate(['']);
  }
  onFocus(name) {
    this.resetErrors();

    switch (name) {
      case 'email':
        this.isEmailError = false;
        break;
      case 'password':
        this.isPasswordError = false;
        break;
    }
  }
}
