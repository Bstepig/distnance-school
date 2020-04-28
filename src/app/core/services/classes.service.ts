import { Grade, RegisterGrade } from '@core/models';

import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private _api: ApiService) {}

  createGrade(grade: RegisterGrade) {
    return this._api.post(`classes/`, grade);
  }

  getClasses(
    school: number
  ): Observable<{
    count: number;
    next: any;
    previous: any;
    results: Grade[];
  }> {
    return this._api.get(`classes/?school=${school}`);
  }
  getGrade(id: number) {
    return this._api.get(`classes/${id}/`);
  }
  updateGrade(id: number, grade: Grade) {
    return this._api.patch(`classes/${id}/`, grade);
  }
}
