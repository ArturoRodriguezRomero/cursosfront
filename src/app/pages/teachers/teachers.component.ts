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
  private columns = ['id', 'name'];
  private teachers: Teacher[] = [];

  private pages: number[];
  private currentPage: number = 0;

  private filterControl = new FormControl('');

  private newTeacherForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    private teacherService: TeachersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setupFilterControlDebounce();
    this.setFilterControlValueFromQueryParams();
    this.updateTable();
  }

  private updateTable() {
    this.teacherService
      .getTeachers(this.currentPage, this.filterControl.value)
      .subscribe(data => {
        console.log(data);
        this.teachers = <Teacher[]>data.content;
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

  private saveNewTeacher() {
    const name = this.newTeacherForm.controls.name.value;
    this.teacherService.addNewTeacher(name).subscribe(data => {
      this.updateTable();
    });
  }
}
