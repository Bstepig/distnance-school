import { User } from './user';

export interface RegisterSchool {
  location?: string;
  fullName: string;
  shortName: string;
  emails?: string[];
  phones?: string[];
  ministry?: string;
  director: number;
  foundation?: Date;
}

export interface School extends RegisterSchool {
  id: number;
}
