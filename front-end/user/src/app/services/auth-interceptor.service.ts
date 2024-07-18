import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { NotificationService } from "./notification.service";

@Injectable({
    'providedIn': 'root'
})

export class AuthInterceptorService implements HttpInterceptor {
    router = new Router
    constructor(private notificationService: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap({
            next: (event: HttpEvent<any>) => {
                if (event.type === HttpEventType.Response) {
                    // console.log('Response data==>', event.status);
                }
            },
            error: (err) => {
                if (err instanceof HttpErrorResponse) {
                    console.log('ERR', err);
                    if (err.status === 0) {
                        this.notificationService.emitErrorEvent('Server is down, please try again later.', '');
                        // alert('Server is down, please try again later.');
                    }
                    else {
                        this.notificationService.emitErrorEvent('', err.message);
                        // alert(err.error);
                    }
                    localStorage.clear();
                    this.router.navigate(['login']);
                }
            },
        }
        ));
    }
}