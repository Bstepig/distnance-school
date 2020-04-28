import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error);
  }

  get<T = any>(path: string): Observable<T> {
    return this.http
      .get<T>(`${environment.apiUrl}${path}`)
      .pipe(catchError(this.formatErrors));
  }

  put<T = any>(
    path: string,
    body: Object,
    headers?: HttpHeaders
  ): Observable<T> {
    headers =
      headers ||
      new HttpHeaders({
        'Content-Type': 'application/json',
      });
    return this.http
      .put<T>(`${environment.apiUrl}${path}`, JSON.stringify(body), {
        headers,
      })
      .pipe(catchError(this.formatErrors));
  }

  patch<T = any>(
    path: string,
    body: Object,
    headers?: HttpHeaders
  ): Observable<T> {
    headers =
      headers ||
      new HttpHeaders({
        'Content-Type': 'application/json',
      });
    return this.http
      .patch<T>(`${environment.apiUrl}${path}`, JSON.stringify(body), {
        headers,
      })
      .pipe(catchError(this.formatErrors));
  }

  patchFile<T = any>(
    path: string,
    body: Object,
    headers?: HttpHeaders
  ): Observable<T> {
    headers = headers || new HttpHeaders();
    return this.http
      .patch<T>(`${environment.apiUrl}${path}`, body, {
        headers,
      })
      .pipe(catchError(this.formatErrors));
  }

  post<T = any>(
    path: string,
    body: Object,
    headers?: HttpHeaders
  ): Observable<T> {
    headers =
      headers ||
      new HttpHeaders({
        'Content-Type': 'application/json',
      });
    return this.http
      .post<T>(`${environment.apiUrl}${path}`, JSON.stringify(body), {
        headers,
      })
      .pipe(catchError(this.formatErrors));
  }

  postFile<T = any>(
    path: string,
    body: FormData,
    headers?: HttpHeaders
  ): Observable<T> {
    headers = headers || new HttpHeaders();
    return this.http
      .post<T>(`${environment.apiUrl}${path}`, body, { headers })
      .pipe(catchError(this.formatErrors));
  }

  delete<T = any>(path: string): Observable<T> {
    return this.http
      .delete<T>(`${environment.apiUrl}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
