import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

import { UserService } from '../services/user/user.service';
import { UserSession } from '../model/user.session';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userSessions : Array<UserSession>;
  userSessionsError : boolean;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userSessionsError = false;
    this.userService.getUserSessions().subscribe(
      data => {
        this.userSessions = data;
      },
      error => {
        this.userSessionsError = true;
      }
    );
  }

}
