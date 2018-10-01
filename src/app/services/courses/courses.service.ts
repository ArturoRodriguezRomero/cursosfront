import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ServerResponse } from '../../models/ServerResponse';

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
}
