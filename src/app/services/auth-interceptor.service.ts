import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    router = new Router
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('Auth interceptor called ==>', JSON.stringify(req));
        return next.handle(req).pipe(tap({
            // next: (event: HttpEvent<any>) => {
            //     if (event.type === HttpEventType.Response) {
            //         console.log('Response data==>', event.status);
            //     }
            // },
            error: (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        alert('Error. Unauthorized access');
                    }
                    else if (err.status === 404) {
                        alert('Error. Resource not found');
                    }
                    else if (err.status === 0) {
                        alert('Error. Server is down');
                    }
                    else if (err.status === 500) {
                        alert(err.message);
                    }
                    localStorage.clear();
                    this.router.navigate(['login']);
                }
            },
            // complete: () => console.info('complete');
        }
        ));
    }
}