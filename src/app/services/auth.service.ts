import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

   //status check: login
   isLoggedIn() {
    return !!sessionStorage.getItem('token')
  }

  //session Storage activities
  setSessionStorage(key: string, storedValue: string) {
    sessionStorage.setItem(`${key}`, storedValue);
  }

  getSessionStorage(key: string) {
    return sessionStorage.getItem(`${key}`)
  }

  deleteSessionStorage(key: string) {
    sessionStorage.removeItem(`${key}`);

  }

  //local Storage activities
  setLocalStorage(key: string, storedValue: string) {
    sessionStorage.setItem(`${key}`, storedValue);
  }

  getLocalStorage(key: string) {
    return sessionStorage.getItem(`${key}`)
  }

  deleteLocalStorage(key: string) {
    sessionStorage.removeItem(`${key}`);
  }
}
