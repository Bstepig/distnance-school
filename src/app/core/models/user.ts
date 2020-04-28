export type userType = 'T' | 'D' | 'P' | 'A' | 'S';

export interface User {
  id: number;
  userType: userType;
  firstName: string;
  middleName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  username: string;
  email?: string;
  birthday?: Date;
  lastLogin?: Date;
}

export interface RegisterUser extends User {
  password: string;
}

export interface AuthToken {
  user_id: number;
  user_type: userType;
}

export interface TeacherShort {
  fullName: string;
  avatar?: string;
}

export interface RegisterGrade {
  name: string;
  entryYear: number;
  endYear?: number;
  pupil?: User[];
  school: number;
}
export interface Grade extends RegisterGrade {
  id: number;
}

export interface Student {
  user: number;
  school: number;
  grade: number;
}

export interface Teacher {
  user: number;
  school: number;
}

export interface Director {
  user: number;
  school: number;
}

export interface Parent {
  user: number;
}

export interface Admin {
  user: number;
}
