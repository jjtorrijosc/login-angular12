import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../model/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = new User();

  loginError: boolean = false;

  constructor(private router: Router,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.loginError = false;
  }

  login(): void {
    this.userService.login(this.user).subscribe(
      data => {
        if (data == true) {
            this.router.navigate(['./home']);
        } else {
            this.loginError = true;
        }
      },
      error => {
        console.log('error login '+error.error);
        this.loginError = true;
      }
    );
  }

}
