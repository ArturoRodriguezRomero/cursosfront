import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { Course } from '../../models/Course';
import { of } from 'rxjs';
import { Subject } from '../../models/Subject';
import { ServerResponseMocks } from '../__mocks__/server.response.mock';

describe('CoursesService', () => {
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };
  let courseService: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    courseService = new CoursesService(<any>httpClientSpy);
  });

  it('should be created', () => {
    expect(courseService).toBeTruthy();
  });

  it('should return expected courses when #getCourses() (HttpClient called once)', () => {
    httpClientSpy.get.and.returnValue(
      of({
        content: ServerResponseMocks.COURSES_MOCK
      })
    );

    courseService
      .getCourses(0, 'filter')
      .subscribe(courses =>
        expect(courses.content).toEqual(
          ServerResponseMocks.COURSES_MOCK,
          'expected courses'
        )
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected courses when #getCourseById() (httpClient called once)', () => {
    const expectedCourse = ServerResponseMocks.COURSE_MOCK;

    httpClientSpy.get.and.returnValue(of(expectedCourse));

    courseService.getCourseById(1).subscribe(course => {
      expect(course).toEqual(expectedCourse, 'expected course');
    });
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected subjects when #getSubjectsFromCourseId() (httpClient called once)', () => {
    httpClientSpy.get.and.returnValue(
      of({
        content: ServerResponseMocks.SUBJECTS_MOCK
      })
    );

    courseService.getSubjectsFromCourseId(1, 1, '').subscribe(subjects => {
      expect(subjects.content).toEqual(
        ServerResponseMocks.SUBJECTS_MOCK,
        'expected subjects'
      );
    });
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected course when #addSubjectToCourse() (httpClient called once)', () => {
    const expectedSubject = ServerResponseMocks.SUBJECT_MOCK;
    expectedSubject.name = 'test name';

    httpClientSpy.post.and.returnValue(of(expectedSubject));

    courseService.addSubjectToCourse(1, 'test name').subscribe(subject => {
      expect(subject.name).toEqual(
        expectedSubject.name,
        'expected subject name'
      );
    });
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });
});
