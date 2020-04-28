import {
  AuthService,
  ClassesService,
  TasksService,
  UserService,
} from '@core/services';
import { Component, OnInit } from '@angular/core';
import { Grade, NewTask, Subject } from '@core/models';

@Component({
  selector: 'ds-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent implements OnInit {
  task: NewTask = {
    attachments: [],
    body: '',
    deadline: new Date(),
    subject: {
      title: '',
    },
    teacher: 0,
    title: '',
    grade: 0,
  };

  grade: number;
  loaded: boolean = false;
  noSchool: boolean = false;
  classes: Grade[] = [];

  constructor(
    private _tasksService: TasksService,
    private _userService: UserService,
    private _authService: AuthService,
    private _classesService: ClassesService
  ) {
    this.task.teacher = this._authService.userId;
    this._userService
      .getTeacher(this._authService.userId)
      .subscribe((teacher) => {
        this.loaded = true;
        if (!teacher.school) {
          this.noSchool = true;
          return;
        }
        this._classesService.getClasses(teacher.school).subscribe((data) => {
          this.classes = data.results;
          this.task.grade = this.classes[0].id;
        });
      });
  }

  ngOnInit(): void {}

  attachments = new FormData();

  load(file: File) {
    const fd = new FormData();
    fd.append('file', file, file.name);
    // this.task.attachments.push(fd as any);
    this.attachments.append('file', file, file.name);
  }

  updateBody(body: string) {
    this.task.body = body;
  }

  paste(event: ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  }

  bold() {
    this._formatMessage('bold');
  }

  italic() {
    this._formatMessage('italic');
  }

  underline() {
    this._formatMessage('underline');
  }

  undo() {
    this._formatMessage('undo');
  }

  redo() {
    this._formatMessage('redo');
  }

  send() {
    console.log(this.attachments.get('file'));
    this._tasksService.createTask(this.task).subscribe((t) => {
      this._tasksService.addAttachments(t.id, this.attachments).subscribe();
    });
  }

  private _formatMessage(cmd: string, value?: string) {
    document.execCommand(cmd, false, value);
  }
}
