import { Observable, of } from 'rxjs';
import { ServerResponse } from '../../models/ServerResponse';
import { ServerResponseMocks } from './server.response.mock';
import { Teacher } from '../../models/Teacher';

export const teachersServiceStub = {
  getTeachers(page: number, filter: string): Observable<ServerResponse> {
    return of(ServerResponseMocks.TEACHERS_RESPONSE);
  },

  getAllTeachers(): Observable<ServerResponse> {
    return of(ServerResponseMocks.TEACHERS_RESPONSE);
  },

  addNewTeacher(): Observable<Teacher> {
    return of(ServerResponseMocks.TEACHER_MOCK);
  },
  addCourseToTeacher(
    teacherId: number,
    name: string,
    active: boolean,
    level: string
  ) {
    return of(ServerResponseMocks.COURSE_MOCK);
  }
};
