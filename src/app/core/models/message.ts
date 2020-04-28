import { User } from '@core/models';

export interface Message {
  sender: User;
  time: Date;
  body: string;
  adjustments?: Attachment[];
}

export interface Attachment {
  filePath: string;
  filename: string;
  extension: string;
  size: number;
}
