import { ClassesService, UserService } from '@core/services';
import { Component, OnInit } from '@angular/core';
import { Grade, RegisterGrade } from '@core/models';

@Component({
  selector: 'ds-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  classes: (RegisterGrade | Grade)[] = [];
  loaded: boolean = false;
  school: number;

  constructor(
    private _classesService: ClassesService,
    private _userService: UserService
  ) {
    this._userService.getCurrentUser().subscribe((user) => {
      this._userService.getTeacher(user.id).subscribe((teacher) => {
        this.school = teacher.school;
        if (!this.school) {
          this.loaded = true;
          return;
        }
        this._classesService.getClasses(this.school).subscribe((classes) => {
          console.log(classes);
          this.classes = classes.results;
          this.loaded = true;
        });
      });
    });
  }

  ngOnInit(): void {}

  addGrade() {
    let grade = {
      entryYear: 1,
      name: 'А',
      school: this.school,
    };
    this.classes.push(grade);
    this._classesService.createGrade(grade).subscribe((g) => {
      grade['id'] = g.id;
    });
  }

  updateGrade(grade: Grade) {
    this._classesService.updateGrade(grade.id, grade).subscribe((grade) => {
      console.log(grade);
    });
  }
}
