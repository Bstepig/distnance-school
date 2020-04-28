import { Component, OnInit } from '@angular/core';
import { Schedule, ScheduleLesson } from '@core/models';

@Component({
  selector: 'ds-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  lesson: ScheduleLesson = {
    title: 'Геометрия',
    teacher: {
      avatar: '',
      fullName: 'Наумович Ирина Николаевна',
    },
  };

  schedule: Schedule = {
    classesStart: 540,
    days: [
      {
        day: 'monday',
        lessons: [
          null,
          null,
          this.lesson,
          this.lesson,
          this.lesson,
          this.lesson,
        ],
      },
      {
        day: 'tuesday',
        lessons: [null, null, this.lesson, this.lesson, this.lesson],
      },
      {
        day: 'wednesday',
        lessons: [
          null,
          this.lesson,
          this.lesson,
          this.lesson,
          this.lesson,
          this.lesson,
        ],
      },
      {
        day: 'thursday',
        lessons: [null, this.lesson, this.lesson, this.lesson],
      },
      {
        day: 'friday',
        lessons: [this.lesson, this.lesson, this.lesson, this.lesson],
      },
      {
        day: 'saturday',
        lessons: [null, null, this.lesson, this.lesson],
      },
    ],
  };
  //   {
  //     sunday: [this.lesson, this.lesson, null],
  //     monday: [this.lesson, this.lesson, this.lesson, this.lesson, this.lesson],
  //     tuesday: [this.lesson, this.lesson, null],
  //     wednesday: [this.lesson, this.lesson, null],
  //     thursday: [this.lesson, this.lesson, null],
  //     friday: [this.lesson, this.lesson, null],
  //     saturday: [this.lesson, this.lesson, null],
  //     classesStart: '08:15',
  //   };

  //   weekDays = [
  //     sunday
  // monday
  // tuesday
  // wednesday
  // thursday
  // friday
  // saturday
  //   ]

  constructor() {}

  ngOnInit(): void {}
}
