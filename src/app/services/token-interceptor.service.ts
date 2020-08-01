import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {

    let tokenizedRequest = req.clone({
      setHeaders: {
        'token': `${sessionStorage.getItem('token')}`
      }
    })
    return next.handle(tokenizedRequest);

  }
}
