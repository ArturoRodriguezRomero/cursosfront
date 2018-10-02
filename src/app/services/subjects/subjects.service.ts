import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ServerResponse } from '../../models/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private endpoint = 'subjects';

  constructor(private http: HttpClient) {}

  private getSubjects(page: number, filter: string) {
    return this.http.get<ServerResponse>(
      `${this.endpoint}?page=${page}&size=${environment.pageSize}${
        filter != null ? `&name=${filter}` : ''
      }`
    );
  }
}
