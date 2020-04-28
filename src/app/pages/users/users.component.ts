import { AuthService, UserService } from '@core/services';
import { Component, OnInit } from '@angular/core';
import { Subject, User, userType } from '@core/models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Subject as RxSubject } from 'rxjs';

@Component({
  selector: 'ds-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[];
  noSchool: boolean = false;
  loading: boolean = true;
  private searchTerms = new RxSubject();
  constructor(
    private _userService: UserService,
    private _authService: AuthService
  ) {
    this._userService.getTeacher(this._authService.userId).subscribe((v) => {
      if (!v.school) {
        this.noSchool = true;
        return;
      }
      this.config.school = v.school;
      this.getUsers();
    });
  }

  config: {
    school?: number;
    userType?: userType;
    search?: string;
  } = {};

  ngOnInit(): void {
    this.searchTerms
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe(() => {
        this.getUsers();
      });
  }

  getAll() {
    delete this.config.userType;
    this.getUsers();
  }
  getStudents() {
    this.config.userType = 'S';
    this.getUsers();
  }
  getTeachers() {
    this.config.userType = 'T';
    this.getUsers();
  }
  getDirectors() {
    this.config.userType = 'D';
    this.getUsers();
  }

  getUsers() {
    console.log(this.config);
    this.loading = true;
    this._userService.getUserList(this.config).subscribe((v) => {
      this.users = v.results;
      this.loading = false;
    });
  }

  search(): void {
    this.searchTerms.next(this.config.search);
  }
}
