import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Environment imports
import { environment } from '../../environments/environment';

// Model imports
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  splitUrl;
  urlToken;
  token;

  userModel: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    new_password: ''
  }

  constructor(private http: HttpClient) { }

  //Registration
  registerUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user)
  }

  //Account Verification
  verifyMail() {
    this.token = this.getUrlToken()
    return this.http.post(environment.apiBaseUrl + '/verify/' + this.token, "")
  }

  //Login
  userLogin(login: User) {
    return this.http.post(environment.apiBaseUrl + '/login', login)
  }

  //Forot Password
  forgotPasword(forgotMail: User) {
    return this.http.post(environment.apiBaseUrl + '/forgot', forgotMail)
  }

  //Reset Password
  resetPassword(newPassword: User) {
    this.token = this.getUrlToken()
    return this.http.post(environment.apiBaseUrl + '/reset/' + this.token, newPassword)
  }

  //To get token from Url
  getUrlToken() {
    this.splitUrl = window.location.href.split('/');
    this.urlToken = this.splitUrl[this.splitUrl.length - 1];
    return this.urlToken;
  }

}

