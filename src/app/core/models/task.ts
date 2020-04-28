import {
  Attachment,
  Grade,
  Message,
  Subject,
  TeacherShort,
} from '@core/models';

export interface NewTask {
  title: string;
  body: string;
  attachments?: Attachment[];
  subject: Subject;
  teacher: number;
  deadline: Date;
  grade: number;
}

export interface Task {
  id: number;
  title: string;
  body: string;
  attachments?: Attachment[];
  subject: Subject;
  teacher: number;
  created: Date;
  deadline: Date;
  messages: Message[];
}
