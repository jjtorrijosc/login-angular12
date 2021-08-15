import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

import { UserService } from '../services/user/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  private subscUser: Subscription;

  constructor(private router: Router,
              private userService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.subscUser = this.userService.$obUsuario.subscribe(
      (user: User) => {
          this.user = user;
      },
      (error) => {console.error('UserComponent onInit error: '+error);}
  );
  }

  ngOnDestroy(): void {
    if (this.subscUser) {
        this.subscUser.unsubscribe();
    }
}

  logout(): void {
    this.userService.logOut();
    this.router.navigate(['./login']);
  }

}
