import { RegisterSchool, School } from '@core/models';

import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private _api: ApiService) {}

  createSchool(school: RegisterSchool): Observable<School> {
    return this._api.post(`schools/`, school);
  }

  updateSchool(id: number, school: RegisterSchool): Observable<School> {
    return this._api.patch(`schools/${id}/`, school);
  }

  getSchoolList(): Observable<{
    count: number;
    next: any;
    previous: any;
    results: School[];
  }> {
    return this._api.get(`schools/`);
  }

  getSchool(id: number): Observable<School> {
    return this._api.get(`schools/${id}/`);
  }
}
