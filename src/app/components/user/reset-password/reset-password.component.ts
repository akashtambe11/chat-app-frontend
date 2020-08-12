import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Service imports
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  hide = true;
  new_reset_password;
  showSuccessMessage: boolean;
  serverErrorMessage;

  constructor(
    public userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]);

  onResetSubmit() {
    this.new_reset_password = {
      'new_password': this.userService.userModel.password
    }

    this.userService.resetPassword(this.new_reset_password).subscribe(
      res => {
        this.showSuccessMessage = true;

        setTimeout(() => {
          this.showSuccessMessage = false;

          // Navigating to Login Page
          this.router.navigateByUrl('/login');
        }, 4000);

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
  getPasswordWarning() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.password.hasError('minlength') ? 'Password contain atleast 6 character' : '';
  }
}
