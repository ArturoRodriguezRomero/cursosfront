import { Component, OnInit } from '@angular/core';

import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/Course';

import { FormControl, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TeachersService } from '../../services/teachers/teachers.service';
import { Teacher } from '../../models/Teacher';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css', '../../../assets/css/data-table.css']
})
export class CoursesComponent implements OnInit {
  public columns = ['name', 'level', 'teacher', 'subjects'];
  public courses: Course[] = [];

  public pages: number[];
  public currentPage: number = 0;

  public filterControl = new FormControl('');

  public newCourseForm = new FormGroup({
    name: new FormControl(''),
    active: new FormControl('true'),
    level: new FormControl('BEGINNER'),
    teacher: new FormControl('1')
  });

  public teachers: Teacher[] = [];

  constructor(
    public courseService: CoursesService,
    public teacherService: TeachersService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setupFilterControlDebounce();
    this.setFilterControlValueFromQueryParams();
    this.getTeachers();
    this.updateTable();
  }

  public updateTable() {
    this.courseService
      .getCourses(this.currentPage, this.filterControl.value)
      .subscribe(data => {
        this.courses = <Course[]>data.content;
        this.pages = new Array(data.totalPages);
      });
    this.changeUrlParams(this.filterControl.value, this.currentPage);
  }

  public changePageTo(pageIndex: number) {
    this.currentPage = pageIndex;
    this.updateTable();
  }

  public filterControlCourses() {
    this.currentPage = 0;
    this.updateTable();
  }

  public setupFilterControlDebounce() {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(environment.typeDebounceTime),
        distinctUntilChanged()
      )
      .subscribe(val => {
        this.filterControlCourses();
      });
  }

  public setFilterControlValueFromQueryParams() {
    this.route.queryParams.subscribe(params => {
      this.filterControl.setValue(params['name']);
    });
  }

  public changeUrlParams(name, page) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        name: name,
        page: page
      }
    });
  }

  public saveNewCourse() {
    const name = this.newCourseForm.controls.name.value;
    const active = this.newCourseForm.controls.active.value;
    const level = this.newCourseForm.controls.level.value;
    const teacher = this.newCourseForm.controls.teacher.value;

    if (name != '') {
      this.teacherService
        .addCourseToTeacher(teacher, name, active, level)
        .subscribe(data => {
          this.updateTable();
          this.newCourseForm.controls.name.setValue('');
        });
    }
  }

  public getTeachers() {
    this.teacherService.getAllTeachers().subscribe(data => {
      this.teachers = data.content;
    });
  }
}
