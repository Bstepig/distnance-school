import { NewTask, Task } from '@core/models';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private _api: ApiService) {}

  getTasks(grade: number): Observable<{ results: Task[] }> {
    return this._api.get(`tasks/?grade=${grade}`);
  }

  getTask(id: number): Observable<Task> {
    return this._api.get(`tasks/${id}/`);
  }

  createTask(task: NewTask): Observable<Task> {
    return this._api.post(`tasks/`, task);
  }

  addAttachments(task: number, formData: FormData) {
    formData.append('task', task.toString());
    return this._api.postFile(`tasks/${task}/attachments/`, formData);
  }

  // createAnswerTask(task: number, answer: FormData) {
  //   return this._api.post(`tasks/${task}/attachments/`, formData);
  // }
}
