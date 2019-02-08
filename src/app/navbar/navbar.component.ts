import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public sessionService: SessionService, public loginService: LoginService) { 
  }

  ngOnInit() {
  }

}
