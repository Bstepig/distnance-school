import { Attachment, Mark, Message, Subject, TeacherShort } from '@core/models';

export interface LessonShort {
  title: string;
  subject: Subject;
  teacher: TeacherShort;
  timeStart: Date;
  timeEnd: Date;
  marks: Mark[];
}

export interface Lesson extends LessonShort {
  body: string;
  adjustments: Attachment[];
  messages: Message[];
}
