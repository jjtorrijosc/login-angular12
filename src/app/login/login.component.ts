import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";

  loginError: boolean = false;

  constructor(private router: Router) {

  }

  login() {
    //TODO:
    this.router.navigate(['./home']);
  }

}
