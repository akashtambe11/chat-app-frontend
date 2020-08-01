import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Service imports
import { AuthService } from './services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // Gaurd to protect dashboard route
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;

    } else {
      this.router.navigate(['/login']);
      return false;

    }
  }
}
