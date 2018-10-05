import { of } from 'rxjs';
import { ServerResponseMocks } from './server.response.mock';

export const coursesServiceStub = {
  getCourses(page: number, filter: string) {
    return of(ServerResponseMocks.COURSES_RESPONSE);
  },

  getCourseById(id: number) {
    return of(ServerResponseMocks.COURSE_MOCK);
  },

  getSubjectsFromCourseId(courseId: number, page: number, filter: string) {
    return of(ServerResponseMocks.SUBJECTS_RESPONSE);
  },

  addSubjectToCourse(courseId: number, subjectName: string) {
    return of(ServerResponseMocks.SUBJECT_MOCK);
  }
};
