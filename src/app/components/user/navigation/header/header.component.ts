import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../../services/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {
  beforeLoginBtn;
  afterLoginBtn;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.renderBtn();
  }

  renderBtn() {
    if (!!sessionStorage.getItem('token')) { //returns true or false
      this.beforeLoginBtn = false;
      this.afterLoginBtn = true;
    } else {
      this.beforeLoginBtn = true;
      this.afterLoginBtn = false;
    }
  }

  navToLogin() {
    this.router.navigateByUrl('/login');
    sessionStorage.clear();
  }

  navToSignUp() {
    this.router.navigateByUrl('/register');
  }
}
