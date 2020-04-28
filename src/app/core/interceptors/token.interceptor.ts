import { BehaviorSubject, Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  catchError,
  filter,
  first,
  map,
  switchMap,
  take,
} from 'rxjs/operators';

import { AuthService } from '@core/services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private auth: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addAuthToken(request);
    return next.handle(request).pipe(
      catchError((error) => {
        if (request.url.includes('token')) {
          if (request.url.includes('refresh')) {
            this.auth.logout();
          }
          throw error;
        }
        if (error.status !== 401) {
          throw error;
        }

        if (this.refreshTokenInProgress) {
          return this.refreshTokenSubject.pipe(
            filter((result) => result !== null),
            take(1),
            switchMap(() => next.handle(this.addAuthToken(request)))
          );
        } else {
          this.refreshTokenInProgress = true;
          this.refreshTokenSubject.next(null);
          return this.auth.refreshToken().pipe(
            switchMap((token: any) => {
              this.refreshTokenInProgress = false;
              this.refreshTokenSubject.next(token);
              return next.handle(this.addAuthToken(request));
            }),
            catchError((err: any) => {
              this.refreshTokenInProgress = false;
              console.log(err);
              this.auth.logout();
              return Observable.throw(error);
            })
          );
        }
      })
    );
  }

  addAuthToken(request) {
    if (!this.auth.hasAccessToken) return request;
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.accessToken}`,
      },
    });
  }
}
