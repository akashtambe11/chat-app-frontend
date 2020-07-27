import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css'],
  providers: [UserService]
})
export class VerifyAccountComponent implements OnInit {
  
  showSuccessMessage: boolean;
  serverErrorMessage;
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  verifyAccount() {

    this.userService.verifyMail().subscribe(
      res => {
        this.showSuccessMessage = true;

        // Navigate to login URL
        setTimeout(() => this.router.navigateByUrl('/login'), 2000);

      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessage = err.error.message;
          setTimeout(() => this.serverErrorMessage = false, 5000);
        } else {
          this.serverErrorMessage = "Something went wrong";
          setTimeout(() => this.serverErrorMessage = false, 5000);
        }
      }
    )

  }

}
