import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ServerResponse } from '../../models/ServerResponse';
import { Course } from '../../models/Course';
import { Subject } from '../../models/Subject';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private endpoint = 'courses';

  constructor(private http: HttpClient) {}

  public getCourses(page: number, filter: string) {
    return this.http.get<ServerResponse>(
      `${this.endpoint}?page=${page}&size=${environment.pageSize}${
        filter != null ? `&name=${filter}` : ''
      }`
    );
  }

  public getCourseById(id: number) {
    return this.http.get<Course>(`${this.endpoint}/${id}`);
  }

  public getSubjectsFromCourseId(
    courseId: number,
    page: number,
    filter: string
  ) {
    return this.http.get<ServerResponse>(
      `${this.endpoint}/${courseId}/subjects?page=${page}&size=${
        environment.pageSize
      }${filter != null ? `&name=${filter}` : ''}`
    );
  }

  public addSubjectToCourse(courseId: number, subjectName: string) {
    return this.http.post<Subject>(`${this.endpoint}/${courseId}/subjects`, {
      name: subjectName
    });
  }
}
