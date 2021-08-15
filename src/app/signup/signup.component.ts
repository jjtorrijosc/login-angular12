import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username: string;
  password: string;
  repassword: string;

  errorPwdNoMatch: boolean;
  signupError: string;

  constructor(private router: Router,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.errorPwdNoMatch = false;
  }

  signup(): void {
    if (this.password == this.repassword) {
      let user : User = new User();
      user.username = this.username;
      user.password = this.password;
      this.userService.signUp(user).subscribe(
        data => {
          console.log('signup respuesta: ');
          this.router.navigate(['./home']);
        },
        error => {
          console.log('error signup '+error.error);
          this.signupError = error.error;
        }
      );

    } else {
      this.errorPwdNoMatch = true;
    }
  }

}
