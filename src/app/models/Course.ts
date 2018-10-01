import { Teacher } from './Teacher';

export interface Course {
  active: boolean;
  id: number;
  level: string;
  name: string;
  teacher: Teacher;
}
