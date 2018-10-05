import { TestBed } from '@angular/core/testing';

import { TeachersService } from './teachers.service';
import { of } from 'rxjs';
import { ServerResponseMocks } from '../__mocks__/server.response.mock';

describe('TeachersService', () => {
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };
  let teachersService: TeachersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    teachersService = new TeachersService(<any>httpClientSpy);
  });

  it('should be created', () => {
    expect(teachersService).toBeTruthy();
  });

  it('should return expected teachers when #getTeachers() (HttpClient called once)', () => {
    httpClientSpy.get.and.returnValue(
      of({
        content: ServerResponseMocks.TEACHERS_MOCK
      })
    );

    teachersService.getTeachers(1, '').subscribe(teachers => {
      expect(teachers.content).toEqual(
        ServerResponseMocks.TEACHERS_MOCK,
        'expected teachers'
      );
    });
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected teachers when #getAllTeachers() (HttpClient called once)', () => {
    httpClientSpy.get.and.returnValue(
      of({
        content: ServerResponseMocks.TEACHERS_MOCK
      })
    );

    teachersService.getAllTeachers().subscribe(teachers => {
      expect(teachers.content).toEqual(
        ServerResponseMocks.TEACHERS_MOCK,
        'expected teachers'
      );
    });
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected teacher when #addNewTeacher() (HttpClient called once)', () => {
    const expectedTeacher = ServerResponseMocks.TEACHER_MOCK;

    httpClientSpy.post.and.returnValue(of(expectedTeacher));

    teachersService.addNewTeacher('test name').subscribe(teacher => {
      expect(teacher).toEqual(expectedTeacher, 'expected teacher');
      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
  });

  it('should return expected course when #addCourseToTeacher() (HttpClient called once)', () => {
    const expectedCourse = ServerResponseMocks.COURSE_MOCK;

    httpClientSpy.post.and.returnValue(of(expectedCourse));

    teachersService
      .addCourseToTeacher(
        expectedCourse.id,
        expectedCourse.name,
        expectedCourse.active,
        expectedCourse.level
      )
      .subscribe(course => {
        expect(course).toEqual(expectedCourse);
        expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
      });
  });
});
