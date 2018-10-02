import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ServerResponse } from '../../models/ServerResponse';
import { Course } from '../../models/Course';
import { Teacher } from '../../models/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private endpoint = 'teachers';

  constructor(private http: HttpClient) {}

  public getTeachers(page: number, filter: string) {
    return this.http.get<ServerResponse>(
      `${this.endpoint}?page=${page}&size=${environment.pageSize}${
        filter != null ? `&name=${filter}` : ''
      }`
    );
  }

  public getAllTeachers() {
    return this.http.get<ServerResponse>(`${this.endpoint}?page=0&size=50`);
  }

  public addNewTeacher(name: string) {
    return this.http.post<Teacher>(`${this.endpoint}`, {
      name
    });
  }

  public addCourseToTeacher(
    teacherId: number,
    name: string,
    active: boolean,
    level: string
  ) {
    return this.http.post<Course>(`${this.endpoint}/${teacherId}/courses`, {
      name,
      active,
      level
    });
  }
}
