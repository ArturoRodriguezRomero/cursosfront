import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/Teacher';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TeachersService } from '../../services/teachers/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css', '../../../assets/css/data-table.css']
})
export class TeachersComponent implements OnInit {
  public columns = ['id', 'name'];
  public teachers: Teacher[] = new Array<Teacher>();

  public pages: number[] = new Array<number>();
  public currentPage: number = 0;

  public filterControl = new FormControl('');

  public newTeacherForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    public teacherService: TeachersService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setupFilterControlDebounce();
    this.setFilterControlValueFromQueryParams();
    this.updateTable();
  }

  updateTable() {
    this.teacherService
      .getTeachers(this.currentPage, this.filterControl.value)
      .subscribe(data => {
        this.teachers = <Teacher[]>data.content;
        this.pages = new Array(data.totalPages);
      });
    this.changeUrlParams(this.filterControl.value, this.currentPage);
  }

  changePageTo(pageIndex: number) {
    this.currentPage = pageIndex;
    this.updateTable();
  }

  filterControlCourses() {
    this.currentPage = 0;
    this.updateTable();
  }

  setupFilterControlDebounce() {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(environment.typeDebounceTime),
        distinctUntilChanged()
      )
      .subscribe(val => {
        this.filterControlCourses();
      });
  }

  setFilterControlValueFromQueryParams() {
    this.route.queryParams.subscribe(params => {
      this.filterControl.setValue(params['name']);
    });
  }

  changeUrlParams(name, page) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        name: name,
        page: page
      }
    });
  }

  saveNewTeacher() {
    const name = this.newTeacherForm.controls.name.value;
    this.teacherService.addNewTeacher(name).subscribe(data => {
      this.updateTable();
    });
  }
}
