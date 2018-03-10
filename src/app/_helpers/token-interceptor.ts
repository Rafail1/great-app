import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from '../_services/authentication.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthenticationService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.token}`
                }
            });
        }
        return next.handle(request);
    }
}