import { Course } from './Course';

export interface Subject {
  id: number;
  name: string;
  course: Course;
}
