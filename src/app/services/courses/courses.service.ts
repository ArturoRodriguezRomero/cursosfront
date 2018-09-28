import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private endpoint = 'courses';

  constructor(private http: HttpClient) {}

  public getCourses() {
    return this.http.get<Course[]>(`${this.endpoint}`);
  }
}
