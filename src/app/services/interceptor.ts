import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = sessionStorage.getItem('token');
    if (token) {
        if(this.authservice.isAuthenticated()){
            return next.handle(
                req.clone({
                  headers: req.headers.append('Authorization', 'Bearer ' + token)
                })
              );
            }
        }
      
    // Not logged in. Continue without modification.
    return next.handle(req);
  }
}