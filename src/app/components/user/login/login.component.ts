import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {

  hide = true;
  showSuccessMessage: boolean;
  serverErrorMessage;
  response;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public userService: UserService,
    private router: Router) { }

  ngOnInit(): void {

    sessionStorage.clear();

    this.loginForm = this.formBuilder.group({
      'email':
        [this.userService.userModel.email,
        [Validators.required,
        Validators.email
        ]],

      'password':
        [this.userService.userModel.password,
        [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
        ]],
    });
  }

  onLoginSubmit() {

    this.userService.userLogin(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        
        this.response = res;
        console.log(this.response);
        
        if (this.response.status == true) {

          this.router.navigateByUrl('/dashboard');
        }

        //Token Set
        sessionStorage.setItem('token', this.response.token)
        sessionStorage.setItem('senderId', this.response.response.id)

        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
      },

      err => {
        if (err.status === 422) {
          this.serverErrorMessage = err.error.message;
          setTimeout(() => this.serverErrorMessage = false, 5000);
        }
        else {
          this.serverErrorMessage = "Something went wrong";
          setTimeout(() => this.serverErrorMessage = false, 5000);
        }
      }
    )
  }

  //Error warning messages
  getEmailWarning() {
    if (this.loginForm.get('email').errors?.required) {
      return 'You must enter a value';
    }
    return this.loginForm.get('email') ? 'Not a valid email' : '';
  }

  getPasswordWarning() {
    if (this.loginForm.get('password').errors?.required) {
      return 'You must enter a value';
    }
    return this.loginForm.get('password').errors?.minlength ? 'Password contain atleast 6 character' : '';
  }


}
