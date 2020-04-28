import { Attachment, Message, Task, User } from '@core/models';
import { AuthService, TasksService, UserService } from '@core/services';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Teacher } from './../../../core/models/user';

@Component({
  selector: 'ds-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  loading: boolean = true;
  error: boolean = false;

  task: Task;
  message: Message;
  teacher: User;

  constructor(
    private _tasksService: TasksService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._activatedRoute.paramMap.subscribe((p) => {
      this._tasksService.getTask(Number(p.get('id'))).subscribe(
        (task) => {
          this.task = task;
          this.loading = false;
          this._userService.getUser(this.task.teacher).subscribe((t) => {
            this.teacher = t;
          });
        },
        (err) => {
          this.error = true;
        }
      );
    })[''];
  }

  isSelfMessage(message: Message) {
    return message.sender.id === this._authService.userId;
  }

  updateBody(body: string) {
    this.message.body = body;
  }

  paste(event: ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  }

  send() {
    return;
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

  private _formatMessage(cmd: string, value?: string) {
    document.execCommand(cmd, false, value);
  }
}
