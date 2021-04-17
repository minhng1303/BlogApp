import { Injectable, Injector } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/AuthService/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // To do: add content-type to headers
    if (this.auth.currentUser) {
      let authRequest = request.clone({
        headers: new HttpHeaders({
          Authorization: `Token ${this.auth.currentUser.token}`
        })
      })
      return next.handle(authRequest)
    } 
    return next.handle(request)
  }
}
