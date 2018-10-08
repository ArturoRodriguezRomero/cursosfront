import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { AppRoutingModule } from '../../router/app-routing/app-routing.module';
import { SubjectsComponent } from '../subjects/subjects.component';
import { TeachersComponent } from '../teachers/teachers.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServerResponseMocks } from '../../services/__mocks__/server.response.mock';
import { TeachersService } from '../../services/teachers/teachers.service';
import { teachersServiceStub } from '../../services/__mocks__/teachers.service.stub';
import { CoursesService } from '../../services/courses/courses.service';
import { coursesServiceStub } from '../../services/__mocks__/courses.service.stub';
import { ActivatedRoute } from '@angular/router';
import { routeStub } from '../../router/__mocks__/router.stubs';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesComponent, SubjectsComponent, TeachersComponent],
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        AppRoutingModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: CoursesService,
          useValue: coursesServiceStub
        },
        {
          provide: TeachersService,
          useValue: teachersServiceStub
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        {
          provide: ActivatedRoute,
          useValue: routeStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;

    spyOn(component, 'setupFilterControlDebounce').and.callThrough();
    spyOn(component, 'setFilterControlValueFromQueryParams').and.callThrough();
    spyOn(component, 'updateTable').and.callThrough();
    spyOn(component, 'changeUrlParams').and.callThrough();
    spyOn(component, 'getTeachers').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct #columns', () => {
    expect(component.columns).toEqual(
      ['name', 'level', 'teacher', 'subjects'],
      "['name', 'level', 'teacher', 'subjects']"
    );
  });

  it('should have empty #courses array', () => {
    expect(component.courses).toBeDefined();
    expect(component.courses).toEqual([], 'empty array');
  });

  it('should have empty #teachers array', () => {
    expect(component.teachers).toBeDefined();
    expect(component.teachers).toEqual([], 'empty array');
  });

  it('should have a #courseLevels array with proper values', () => {
    expect(component.courseLevels).toEqual([
      'BEGINNER',
      'ELEMENTARY',
      'INTERMEDIATE',
      'ADVANCED',
      'PROFICIENT'
    ]);
  });

  it('should set up on #ngOnInit()', () => {
    component.ngOnInit();

    expect(component.setupFilterControlDebounce).toHaveBeenCalled();
    expect(component.setFilterControlValueFromQueryParams).toHaveBeenCalled();
    expect(component.updateTable).toHaveBeenCalled();
    expect(component.getTeachers).toHaveBeenCalled();
  });

  it('should #updateTable with correct data and #changeUrlParams', () => {
    component.updateTable();

    expect(component.updateTable).toHaveBeenCalled();
    expect(component.courses).toEqual(
      <any>ServerResponseMocks.COURSES_RESPONSE.content,
      'ServerResponseMocks.COURSES_RESPONSE.content'
    );
    expect(component.pages.length).toEqual(
      ServerResponseMocks.COURSES_RESPONSE.totalPages,
      'ServerResponseMocks.COURSES_RESPONSE.totalPages'
    );

    expect(component.changeUrlParams).toHaveBeenCalled();
  });

  it('should #changePageTo correctly and #updateTable', () => {
    component.changePageTo(1);

    expect(component.currentPage).toEqual(1);
    expect(component.updateTable).toHaveBeenCalled();
  });

  it('should set #currentPage = 0 when #filterControlCourses and #updateTable', () => {
    component.filterControlCourses();

    expect(component.currentPage).toEqual(0);
    expect(component.updateTable).toHaveBeenCalled();
  });

  it('should #setupFilterControlDebounce properly', () => {
    spyOn(component, 'filterControlCourses').and.callThrough();

    component.setupFilterControlDebounce();

    component.filterControl.valueChanges.subscribe(data =>
      expect(component.filterControlCourses).toHaveBeenCalled()
    );
  });

  it('should #setFilterControlValueFromQueryParams properly', () => {
    spyOn(component.route.queryParams, 'subscribe').and.callThrough();

    component.setFilterControlValueFromQueryParams();

    component.route.queryParams.subscribe(params => {
      expect(component.filterControl.value).toEqual('test');
    });
  });

  it('should #changeUrlParams properly', () => {
    component.changeUrlParams('test', 1);

    component.route.queryParams.subscribe(data => {
      expect(data).toEqual({ name: 'test', page: 1 });
    });
  });

  it('should #teacherService.addCourseToTeacher and #updateTable when #saveNewCourse', () => {
    component.newCourseForm.controls.name.setValue('test');
    component.newCourseForm.controls.active.setValue(true);
    component.newCourseForm.controls.level.setValue('BEGINNER');
    component.newCourseForm.controls.teacher.setValue(1);
    spyOn(component.teacherService, 'addCourseToTeacher').and.callThrough();

    component.saveNewCourse();

    expect(component.teacherService.addCourseToTeacher).toHaveBeenCalled();
    expect(component.updateTable).toHaveBeenCalled();
  });

  it('should #teacherService.getAllTeachers and set #teachers when #getTeachers', () => {
    spyOn(component.teacherService, 'getAllTeachers').and.callThrough();

    component.getTeachers();

    expect(component.teacherService.getAllTeachers).toHaveBeenCalled();
    expect(component.teachers).toEqual(
      ServerResponseMocks.TEACHERS_RESPONSE.content
    );
  });
});
