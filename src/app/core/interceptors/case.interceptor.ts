import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CaseInterceptor implements HttpInterceptor {
  constructor() {}

  private snakeToCamel = (str) =>
    str.replace(/([_]\w)/g, (g) => g[1].toUpperCase());
  private camelToSnake = (str) =>
    str.replace(/([A-Z])/g, (group) => '_' + group.toLowerCase());

  private isObject = function (o) {
    return o === Object(o) && !Array.isArray(o) && typeof o !== 'function';
  };

  private keysToCamel = (o: Object) => {
    if (this.isObject(o)) {
      const n = {};

      Object.keys(o).forEach((k) => {
        n[this.snakeToCamel(k)] = this.keysToCamel(o[k]);
      });

      return n;
    } else if (Array.isArray(o)) {
      return o.map((i) => {
        return this.keysToCamel(i);
      });
    }

    return o;
  };

  private keysToSnake = (o: Object) => {
    if (this.isObject(o)) {
      const n = {};

      Object.keys(o).forEach((k) => {
        n[this.camelToSnake(k)] = this.keysToSnake(o[k]);
      });

      return n;
    } else if (Array.isArray(o)) {
      return o.map((i) => {
        return this.keysToSnake(i);
      });
    }

    return o;
  };

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req);
    if (req.body && req.headers.get('content-type') === 'application/json')
      req = req.clone({
        body: this.keysToSnake(JSON.parse(req.body)),
      });
    console.log(req);
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(event);
          if (event.body)
            return event.clone({ body: this.keysToCamel(event.body) });
        }
        return event;
      })
    );
  }
}
