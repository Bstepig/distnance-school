import {
  Admin,
  Director,
  Parent,
  RegisterUser,
  Student,
  Teacher,
} from '@core/models';
import { first, map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { AuthService } from '@core/services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@core/models';
import { userType } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService, private _authService: AuthService) {}

  getUser(id: number): Observable<User> {
    return this.api.get<User>(`users/${id}/`).pipe(
      map((user) => {
        if (user.birthday) {
          user.birthday = new Date(user.birthday);
        }
        user.lastLogin = new Date(user.lastLogin);
        return user;
      })
    );
  }

  getCurrentUser(): Observable<User> {
    const id = this._authService.userId;
    if (!id) throw Error('Unauthorized');
    return this.getUser(id);
  }

  updateCurrentUserAvatar(data: FormData) {
    return this.api.patchFile<User>(`users/${this._authService.userId}/`, data);
  }

  updateCurrentUser(data: Partial<User>) {
    return this.updateUser(this._authService.userId, data);
  }

  updateUser(id: number, data: Partial<User>): Observable<User> {
    return this.api.patch<User>(`users/${id}/`, data).pipe(
      map((user) => {
        if (user.birthday) {
          user.birthday = user.birthday.toJSON() as any;
        }
        return user;
      })
    );
  }

  getStudent(id: number): Observable<Student> {
    return this.api.get(`students/${id}/`);
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.api.get(`teachers/${id}/`);
  }

  getDirector(id: number): Observable<Director> {
    return this.api.get(`directors/${id}/`);
  }

  registerStudent(data: RegisterUser): Observable<Student> {
    return this.api.post(`students/`, data);
  }

  registerTeacher(data: RegisterUser): Observable<Teacher> {
    return this.api.post(`teachers/`, data);
  }

  registerDirector(data: RegisterUser): Observable<Director> {
    return this.api.post(`directors/`, data);
  }

  registerParent(data: RegisterUser): Observable<Parent> {
    return this.api.post(`parents/`, data);
  }

  registerAdmin(data: RegisterUser): Observable<Admin> {
    return this.api.post(`admins/`, data);
  }

  updateStudent(id: number, data: Partial<Student>): Observable<Student> {
    return this.api.patch(`students/${id}/`, data);
  }

  updateTeacher(id: number, data: Partial<Teacher>): Observable<Teacher> {
    return this.api.patch(`teachers/${id}/`, data);
  }

  updateParent(id: number, data: Partial<Parent>): Observable<Parent> {
    return this.api.patch(`parents/${id}/`, data);
  }

  updateAdmin(id: number, data: Partial<Admin>): Observable<Admin> {
    return this.api.patch(`admins/${id}/`, data);
  }

  private camelToSnake = (str) =>
    str.replace(/([A-Z])/g, (group) => '_' + group.toLowerCase());

  getUserList(config?: {
    school?: number;
    userType?: userType;
    search?: string;
  }): Observable<{ results: User[] }> {
    console.log(config);
    let params = '';
    if (config) {
      const arr = Object.keys(config).map((key) => {
        if (!config[key]) return;
        return `${this.camelToSnake(key)}=${config[key]}`;
      });
      params = '?' + arr.join('&');
    }
    return this.api.get(`users/${params}`);
  }
}
