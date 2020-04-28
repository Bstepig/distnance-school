import { TeacherShort } from './user';

export type weekDay =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export interface Schedule {
  days: ScheduleDay[];
  classesStart: number;
}

export interface ScheduleDay {
  lessons: (ScheduleLesson | null)[];
  day: weekDay;
}

export interface ScheduleLesson {
  title: string;
  teacher: TeacherShort;
}
