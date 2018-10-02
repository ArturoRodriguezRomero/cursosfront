import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from '../../models/Subject';
import { SubjectsService } from '../../services/subjects/subjects.service';
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
  private columns = ['id', 'name'];
  private subjects: Subject[] = [];

  private pages: number[];
  private currentPage: number = 0;

  private filterControl = new FormControl('');

  private newSubjectForm = new FormGroup({
    name: new FormControl('')
  });

  private courseId: number = -1;
  private course: Course;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setupFilterControlDebounce();
    this.setFilterControlValueFromQueryParams();
    this.setCourseIdFromParams();
    this.updateTable();
  }

  private updateTable() {
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

  private setCourseIdFromParams() {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
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

  private saveNewSubject() {
    const name = this.newSubjectForm.controls.name.value;
    this.coursesService
      .addSubjectToCourse(this.course.id, name)
      .subscribe(data => {
        this.updateTable();
      });
  }
}
