import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(public toasterService: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');

    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', token) });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          this.toasterService.success("message", "Title", { positionClass: 'toast-bottom-center' });
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
          } catch (e) {
            this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
          }
          //log error
        }
        return of(err);
      }));
  }
}
