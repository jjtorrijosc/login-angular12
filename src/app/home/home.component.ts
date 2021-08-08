import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserSession } from '../model/user.session';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userSessions : UserSession[];
  userSessionsError : boolean = false;

  constructor() {
    this.userSessions = [];
  }

  ngOnInit(): void {
  }

}
