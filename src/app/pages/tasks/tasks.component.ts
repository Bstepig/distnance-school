import { AuthService, TasksService, UserService } from '@core/services';
import { Component, OnInit } from '@angular/core';

import { Task } from '@core/models';

@Component({
  selector: 'ds-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  loading: boolean = true;

  canCreateTask: boolean;
  noSchool: boolean;
  noGrade: boolean;

  constructor(
    private _auth: AuthService,
    private _tasksService: TasksService,
    private _userService: UserService
  ) {
    if (this._auth.userType === 'S') {
      this._userService.getStudent(this._auth.userId).subscribe((v) => {
        if (!v.school) {
          this.noSchool = true;
          this.loading = false;
          return;
        }
        if (!v.grade) {
          this.noGrade = true;
          this.loading = false;
          return;
        }
        this._tasksService.getTasks(v.grade).subscribe((tasks) => {
          this.tasks = tasks.results;
          this.loading = false;
        });
      });
    } else {
      this.loading = false;
    }
  }

  ngOnInit(): void {
    this.canCreateTask =
      this._auth.userType === 'T' || this._auth.userType === 'D';
  }

  get userType() {
    return this._auth.userType;
  }
}
