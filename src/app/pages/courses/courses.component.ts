import { Component, OnInit } from '@angular/core';

import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/Course';

import { FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css', '../../../assets/css/data-table.css']
})
export class CoursesComponent implements OnInit {
  private columns = ['active', 'name', 'level', 'teacher'];
  private courses: Course[] = [];

  private pages: number[];
  private currentPage: number = 0;

  private filterControl = new FormControl('');

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setupFilterControlDebounce();
    this.setFilterControlValueFromQueryParams();
    this.updateTable();
  }

  private updateTable() {
    this.courseService
      .getCourses(this.currentPage, this.filterControl.value)
      .subscribe(data => {
        console.log(data);
        this.courses = <Course[]>data.content;
        this.pages = new Array(data.totalPages);
      });
    this.changeUrlParams(this.filterControl.value, this.currentPage);
  }

  private changePageTo(pageIndex: number) {
    this.currentPage = pageIndex;
    this.updateTable();
  }

  private filterControlCourses() {
    this.currentPage = 0;
    this.updateTable();
  }

  private setupFilterControlDebounce() {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(environment.typeDebounceTime),
        distinctUntilChanged()
      )
      .subscribe(val => {
        this.filterControlCourses();
      });
  }

  private setFilterControlValueFromQueryParams() {
    this.route.queryParams.subscribe(params => {
      this.filterControl.setValue(params['name']);
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
