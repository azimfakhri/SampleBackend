import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { switchMap, take, filter } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('refresh') !== -1) {
            return next.handle(req);
        }
        if (req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }

        const accessExpired = !this.authservice.isAuthenticated();

        if (accessExpired) {
            
            const res = this.refreshToken();

            if(res){
                return next.handle(this.injectToken(req));
            }else{
                return next.handle(req);
            }
        }
    
        if (!accessExpired) {
            return next.handle(this.injectToken(req));
        }
    
        // Not logged in. Continue without modification.
        return next.handle(req);
    }

    async refreshToken(){
        const res = await this.authservice.refreshToken();
        return res;
    }

    injectToken(request: HttpRequest<any>) {
        const token = sessionStorage.getItem('user-token');
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`

            }
        });
    }
}