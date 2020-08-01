import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// service imports
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [UserService]
})
export class ForgotPasswordComponent implements OnInit {

  forgotMailId;
  showSuccessMessage: boolean;
  serverErrorMessage;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  onForgotSubmit() {
    this.forgotMailId = {
      'email': this.userService.userModel.email
    }

    this.userService.forgotPasword(this.forgotMailId).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);

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

  //Error warning messages
  getEmailMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
