import { AuthService, SchoolService, UserService } from '@core/services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { ClassesService } from './../../core/services/classes.service';
import { Grade } from './../../core/models/user';
import { School } from './../../core/models/school';
import { User } from '@core/models/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ds-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isEdit: boolean;

  user: User;
  schoolForm: FormGroup;
  schoolList: School[];
  $schoolList: any;
  school: School;
  $gradeList: any;
  grade: Grade;

  load(file: File) {
    const formData: FormData = new FormData();
    formData.append('avatar', file, file.name);
    this._userService.updateCurrentUserAvatar(formData).subscribe(
      (user) => {
        this.user = user;
      },
      (err) => console.log(err)
    );
  }

  fullName: string = '';
  editLink: string = 'edit';
  form: FormGroup;
  d: any;

  constructor(
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _userService: UserService,
    private _fb: FormBuilder,
    private _schoolService: SchoolService,
    private _classesService: ClassesService
  ) {
    this.$schoolList = this._schoolService
      .getSchoolList()
      .pipe(map((data) => data.results));
    // .subscribe((data) => {
    //   this.schoolList = data.results;
    // });
    this.form = this._fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
    });
    this.schoolForm = this._fb.group({
      fullName: [''],
      shortName: [''],
      location: [''],
    });
    this._userService.getCurrentUser().subscribe((v) => {
      this.user = v;
      this.form.patchValue(this.user);
      this.fullName = `${this.user.lastName} ${this.user.firstName} ${this.user.middleName}`;
    });
    switch (this.userType) {
      case 'D':
      case 'T': {
        this._userService
          .getTeacher(this._authService.userId)
          .subscribe((teacher) => {
            this.d = teacher;
            if (this.d.school) {
              this._schoolService.getSchool(this.d.school).subscribe((data) => {
                this.school = data;
                this.schoolForm.patchValue(data);
              });
            }
          });
        break;
      }
      case 'S': {
        this._userService
          .getStudent(this._authService.userId)
          .subscribe((student) => {
            this.d = student;
            if (this.d.school) {
              this.updateGradeList(this.d.school);
              this._schoolService.getSchool(this.d.school).subscribe((data) => {
                this.school = data;
              });
            }
            if (this.d.grade) {
              this._classesService.getGrade(this.d.grade).subscribe((data) => {
                this.grade = data;
              });
            }
          });
        break;
      }
    }
  }

  get userType() {
    return this._authService.userType;
  }

  update() {
    this._userService.updateCurrentUser(this.form.value).subscribe();
  }

  ngOnInit(): void {
    this._route.data.subscribe((data: { edit: boolean }) => {
      this.isEdit = data.edit;
      if (this.isEdit) {
        this.editLink = '/profile';
      }
    });
  }

  updateGradeList(school: number) {
    this.$gradeList = this._classesService
      .getClasses(school)
      .pipe(map((v) => v.results));
  }

  chooseGrade(grade: Grade) {
    this.grade = grade;
    this._userService
      .updateStudent(this._authService.userId, { grade: grade.id })
      .subscribe((student) => {
        this.d = student;
      });
  }

  createSchool() {
    this._schoolService.createSchool(this.schoolForm.value).subscribe(
      (school) => {
        this.chooseSchool(school);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateSchool() {
    this._schoolService
      .updateSchool(this.school.id, this.schoolForm.value)
      .subscribe(
        (school) => {
          this.chooseSchool(school);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  chooseSchool(school: School) {
    this.school = school;
    switch (this.userType) {
      case 'D':
      case 'T': {
        this._userService
          .updateTeacher(this._authService.userId, { school: school.id })
          .subscribe((teacher) => {
            this.d = teacher;
          });
        break;
      }
      case 'S': {
        this._userService
          .updateStudent(this._authService.userId, { school: school.id })
          .subscribe((student) => {
            this.d = student;
          });
        this.updateGradeList(school.id);
        break;
      }
    }
  }

  removeSchool() {
    this.removeGrade();
    this.chooseSchool({
      id: null,
    } as any);
  }

  removeGrade() {
    this.chooseGrade({
      id: null,
    } as any);
  }

  logout() {
    this._authService.logout();
  }
}
