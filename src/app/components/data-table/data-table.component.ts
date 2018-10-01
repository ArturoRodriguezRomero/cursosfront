import { Component, OnInit } from '@angular/core';

import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/Course';

import { FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  private courses: Course[] = [];

  private pages: number[];
  private currentPage: number = 0;
  private filter = new FormControl('');

  private columns = ['active', 'name', 'level', 'teacher'];

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setupFilterDebounce();
    this.setFilterValueFromQueryParams();
    this.updateCourses();
  }

  private updateCourses() {
    this.courseService
      .getCourses(this.currentPage, this.filter.value)
      .subscribe(data => {
        console.log(data);
        this.courses = <Course[]>data.content;
        this.pages = new Array(data.totalPages);
      });
  }

  private changePageTo(pageIndex: number) {
    this.currentPage = pageIndex;
    this.updateCourses();
    this.changeUrlParams(this.filter.value, this.currentPage);
  }

  private filterCourses() {
    this.currentPage = 0;
    this.updateCourses();
    this.changeUrlParams(this.filter.value, this.currentPage);
  }

  private setupFilterDebounce() {
    this.filter.valueChanges
      .pipe(
        debounceTime(environment.typeDebounceTime),
        distinctUntilChanged()
      )
      .subscribe(val => {
        this.filterCourses();
      });
  }

  private setFilterValueFromQueryParams() {
    this.route.queryParams.subscribe(params => {
      this.filter.setValue(params['name']);
    });
  }

  private changeUrlParams(name, page) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        name: name,
        page: page
      }
    });
  }
}
