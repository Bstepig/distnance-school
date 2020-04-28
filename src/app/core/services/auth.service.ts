import { AuthToken, User } from '@core/models';
import { RegisterUser, userType } from './../models/user';
import { map, mergeMap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const authExpiresDays = 10;

interface AuthTokenAccess {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  checkUsername(username: string): Observable<boolean> {
    if (!username) return;
    return this.api
      .get<{
        exists: boolean;
      }>(`check-username/${username}/`)
      .pipe(map((v) => v.exists));
  }
  constructor(
    private cookie: CookieService,
    private api: ApiService,
    private _router: Router
  ) {}

  get jwtToken() {
    return this.cookie.get('token');
  }

  get parsedToken(): AuthToken {
    if (!this.hasAccessToken) return null;
    return this.parseJwt(this.accessToken);
  }

  get hasAccessToken(): boolean {
    return this.cookie.check('access-token');
  }

  get accessToken(): string {
    return this.cookie.get('access-token');
  }

  getRefreshToken(): string {
    return this.cookie.get('refresh-token');
  }

  get userId(): number {
    if (!this.hasAccessToken) return null;
    return this.parsedToken.user_id;
  }

  get userType(): userType {
    if (!this.hasAccessToken) return null;
    return this.parsedToken.user_type;
  }

  login(username: string, password: string): Observable<AuthToken> {
    const data = { username, password };
    return this.api.post<AuthTokenAccess>('token/', data).pipe(
      map((obj: AuthTokenAccess) => {
        console.log(obj);
        const accessToken: string = obj.access;
        const refreshToken: string = obj.refresh;
        this.setAccessToken(accessToken);
        this.cookie.set(
          'refresh-token',
          refreshToken,
          authExpiresDays,
          '/',
          '',
          false,
          'Strict'
        );
        return this.parsedToken;
      })
    );
  }

  setAccessToken(token: string) {
    this.cookie.set(
      'access-token',
      token,
      authExpiresDays,
      '/',
      '',
      false,
      'Strict'
    );
  }

  refreshToken(): Observable<void> {
    return this.api
      .post<{
        access: string;
      }>('token/refresh/', {
        refresh: this.getRefreshToken(),
      })
      .pipe(
        map((v) => {
          this.setAccessToken(v.access);
          return;
        })
      );
  }

  register(user: RegisterUser): Observable<AuthToken> {
    return this.api.post<User>('register/', user).pipe(
      mergeMap((obj: User) => {
        return this.login(user.username, user.password);
      })
    );
  }

  logout(): void {
    this.cookie.deleteAll('/');
    this._router.navigateByUrl('/login');
  }

  isUser(type: string): boolean;
  isUser(types: string[]): boolean;
  isUser(types: string | string[]): boolean {
    if (typeof types === 'string') return this.userType === types;
    return !!types.indexOf(this.userType);
  }

  private parseJwt(token: string): AuthToken {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
}
