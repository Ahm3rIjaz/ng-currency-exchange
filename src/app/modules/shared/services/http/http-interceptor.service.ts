import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoaderService } from '../loader.service';
import { NotificationService } from '../notification.service';

/**
 * This class is to intercept HTTP Request and handle errors
 *
 * @export
 * @class HttpErrorInterceptor
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly spinner: LoaderService,
    private readonly notificationService: NotificationService,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.setSpinnerState(true);
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.spinner.setSpinnerState(false);
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            // This is client side error
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // This is server side error
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.error(errorMsg);
          this.notificationService.show(errorMsg);
          return throwError(() => errorMsg);
        }),
        map((event: any) => {
          if (event instanceof HttpResponse) {
            this.spinner.setSpinnerState(false);
          }
          return event;
        })
      )
  }
}
