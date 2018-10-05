import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersComponent } from './teachers.component';
import { TeachersService } from '../../services/teachers/teachers.service';

import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material';
import { AppRoutingModule } from '../../router/app-routing/app-routing.module';
import { CoursesComponent } from '../courses/courses.component';
import { ServerResponseMocks } from '../../services/__mocks__/server.response.mock';
import { SubjectsComponent } from '../subjects/subjects.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { teachersServiceStub } from '../../services/__mocks__/teachers.service.stub';
import { routeStub } from '../../router/__mocks__/router.stubs';

describe('TeachersComponent', () => {
  let component: TeachersComponent;
  let fixture: ComponentFixture<TeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeachersComponent, CoursesComponent, SubjectsComponent],
      imports: [
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        HttpClientModule
      ],
      providers: [
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
    fixture = TestBed.createComponent(TeachersComponent);
    component = fixture.debugElement.componentInstance;

    spyOn(component, 'setupFilterControlDebounce').and.callThrough();
    spyOn(component, 'setFilterControlValueFromQueryParams').and.callThrough();
    spyOn(component, 'updateTable').and.callThrough();
    spyOn(component, 'changeUrlParams').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct #columns', () => {
    expect(component.columns).toEqual(['id', 'name'], "['id', 'name']");
  });

  it('should have empty #teachers array', () => {
    expect(component.teachers).toBeDefined();
    expect(component.teachers).toEqual([], 'empty array');
  });

  it('should set up on #ngOnInit()', () => {
    component.ngOnInit();

    expect(component.setupFilterControlDebounce).toHaveBeenCalled();
    expect(component.setFilterControlValueFromQueryParams).toHaveBeenCalled();
    expect(component.updateTable).toHaveBeenCalled();
  });

  it('should #updateTable with correct data and #changeUrlParams', () => {
    component.updateTable();

    expect(component.updateTable).toHaveBeenCalled();
    expect(component.teachers).toEqual(
      ServerResponseMocks.TEACHERS_RESPONSE.content,
      'ServerResponseMocks.TEACHERS_RESPONSE.content'
    );
    expect(component.pages.length).toEqual(
      ServerResponseMocks.TEACHERS_RESPONSE.totalPages,
      'ServerResponseMocks.TEACHERS_RESPONSE.totalPages'
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

  it('should #teachersService.addNewTeacher and #updateTable when #saveNewTeacher', () => {
    component.newTeacherForm.controls.name.setValue('test');
    spyOn(component.teacherService, 'addNewTeacher').and.callThrough();

    component.saveNewTeacher();

    expect(component.teacherService.addNewTeacher).toHaveBeenCalled();
    expect(component.updateTable).toHaveBeenCalled();
  });
});
