import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {

  hide = true;
  showSuccessMessage: boolean;
  serverErrorMessage;
  response;

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public userService: UserService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      'firstName':
        [this.userService.userModel.firstName,
        [Validators.required,
        Validators.minLength(2),
        ]],

      'lastName':
        [this.userService.userModel.lastName,
        [Validators.required,
        Validators.minLength(2),
        ]],

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

  onRegisterSubmit() {

    this.userService.registerUser(this.registrationForm.value).subscribe(
      res => {
          this.showSuccessMessage = true;
          this.router.navigateByUrl('/login');
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
  getEmailWarning() {
    if (this.registrationForm.get('email').errors?.required) {
      return 'You must enter a value';
    }
    return this.registrationForm.get('email') ? 'Not a valid email' : '';
  }

  getPasswordWarning() {
    if (this.registrationForm.get('password').errors?.required) {
      return 'You must enter a value';
    }
    return this.registrationForm.get('password').errors?.minlength ? 'Password contain atleast 6 character' : '';
  }

  getNameWarning(key: string){
    if (this.registrationForm.get(`${key}`).errors?.required) {
      return 'You must enter a value';
    }
    return this.registrationForm.get(`${key}`).errors?.minlength ? 'Password contain atleast 2 character' : '';
  }

}

