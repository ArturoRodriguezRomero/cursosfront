import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from '../../models/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css', '../../../assets/css/data-table.css']
})
export class SubjectsComponent implements OnInit {
  public columns = ['id', 'name'];
  public subjects: Subject[] = [];

  public pages: number[];
  public currentPage: number = 0;

  public filterControl = new FormControl('');

  public newSubjectForm = new FormGroup({
    name: new FormControl('')
  });

  public courseId: number = -1;
  public course: Course;

  constructor(
    public coursesService: CoursesService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setupFilterControlDebounce();
    this.setFilterControlValueFromQueryParams();
    this.setCourseIdFromParams();
    this.updateTable();
  }

  public updateTable() {
    this.coursesService.getCourseById(this.courseId).subscribe(data => {
      this.course = data;
      console.log('data', data);
    });
    this.coursesService
      .getSubjectsFromCourseId(
        this.courseId,
        this.currentPage,
        this.filterControl.value
      )
      .subscribe(data => {
        this.subjects = <Subject[]>data.content;
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

  public setCourseIdFromParams() {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
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

  public saveNewSubject() {
    const name = this.newSubjectForm.controls.name.value;
    this.coursesService
      .addSubjectToCourse(this.course.id, name)
      .subscribe(data => {
        this.updateTable();
      });
  }
}
