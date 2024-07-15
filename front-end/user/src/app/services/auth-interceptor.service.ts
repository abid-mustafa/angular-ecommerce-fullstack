import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    router = new Router
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap({
            next: (event: HttpEvent<any>) => {
                if (event.type === HttpEventType.Response) {
                    // console.log('Response data==>', event.status);
                }
            },
            error: (err) => {
                if (err instanceof HttpErrorResponse) {
                    console.log(err);
                    if (err.status === 0)
                        alert('Server is down, please try again later.');
                    else 
                        alert(err.error);
                    localStorage.clear();
                    this.router.navigate(['login']);
                }
            },
        }
        ));
    }
}