import { Book } from './../book.model';
import { LoginService, DataObj } from './../login.service';
import { User } from './../user.model';
import { SessionService } from './../session.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  loggedUser: User;
  Library: DataObj;
  closeResult: string;
  constructor(private navRouter: Router, public sessionService: SessionService, public loginService: LoginService, private modalService: NgbModal) {
    if (!this.sessionService.isLogged) {
      this.navRouter.navigate(['']);
    }
  }


  ngOnInit() {
    this.loggedUser = this.sessionService.activeUser;
    this.Library = this.loginService.Library;
    //console.log(this.Library.Users[0].);
  }
  getFilteredLibrary() {
    let _lib: Book[] = this.Library.Books.filter(x => x.b_withuser == this.loggedUser.usr_id);
    return _lib;
  }
  getDueDate(wdate:string)
  {
    //date/time
    var date1 = new Date(wdate);
    date1.setMonth(date1.getMonth() + 1);
    return date1;
  }
  getBooksCount(user_id:number):number
  {
    let _lib: Book[] = this.Library.Books.filter(x => x.b_withuser == user_id);
    return _lib.length;
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "lg" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
