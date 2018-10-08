import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsComponent } from './subjects.component';
import { CoursesComponent } from '../courses/courses.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from '../../router/app-routing/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CoursesService } from '../../services/courses/courses.service';
import { coursesServiceStub } from '../../services/__mocks__/courses.service.stub';
import { TeachersComponent } from '../teachers/teachers.component';
import { ActivatedRoute } from '@angular/router';
import { routeStub } from '../../router/__mocks__/router.stubs';
import { ServerResponseMocks } from '../../services/__mocks__/server.response.mock';
import { Subject } from '../../models/Subject';

describe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectsComponent, CoursesComponent, TeachersComponent],
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
          provide: CoursesService,
          useValue: coursesServiceStub
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
    fixture = TestBed.createComponent(SubjectsComponent);
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

  it('should have empty #subjects array', () => {
    expect(component.subjects).toBeDefined();
    expect(component.subjects).toEqual([], 'empty array');
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
    expect(component.subjects).toEqual(
      <Subject[]>ServerResponseMocks.SUBJECTS_RESPONSE.content,
      'ServerResponseMocks.SUBJECTS_RESPONSE.content'
    );
    expect(component.pages.length).toEqual(
      ServerResponseMocks.SUBJECTS_RESPONSE.totalPages,
      'ServerResponseMocks.SUBJECTS_RESPONSE.totalPages'
    );

    expect(component.changeUrlParams).toHaveBeenCalled();
  });

  it('should #changePageTo correctly and #updateTable', () => {
    component.changePageTo(1);

    expect(component.currentPage).toEqual(1);
    expect(component.updateTable).toHaveBeenCalled();
  });

  it('should set #currentPage = 0 when #filterControlSubjects and #updateTable', () => {
    component.filterControlSubjects();

    expect(component.currentPage).toEqual(0);
    expect(component.updateTable).toHaveBeenCalled();
  });

  it('should #setupFilterControlDebounce properly', () => {
    spyOn(component, 'filterControlSubjects').and.callThrough();

    component.setupFilterControlDebounce();

    component.filterControl.valueChanges.subscribe(data =>
      expect(component.filterControlSubjects).toHaveBeenCalled()
    );
  });

  it('should #setFilterControlValueFromQueryParams properly', () => {
    spyOn(component.route.queryParams, 'subscribe').and.callThrough();

    component.setFilterControlValueFromQueryParams();

    component.route.queryParams.subscribe(params => {
      expect(component.filterControl.value).toEqual('test');
    });
  });

  it('should #setCourseIdFromParams properly', () => {
    spyOn(component.route.queryParams, 'subscribe').and.callThrough();

    component.setCourseIdFromParams();

    component.route.queryParams.subscribe(params => {
      expect(component.courseId).toEqual(1);
    });
  });

  it('should #changeUrlParams properly', () => {
    component.changeUrlParams('test', 1);

    component.route.queryParams.subscribe(data => {
      expect(data).toEqual({ name: 'test', page: 1 });
    });
  });

  it('should #courseService.addSubjectToCourse and #updateTable when #saveNewSubject', () => {
    component.newSubjectForm.controls.name.setValue('test');
    spyOn(component.coursesService, 'addSubjectToCourse').and.callThrough();
    component.course = ServerResponseMocks.COURSE_MOCK;

    component.saveNewSubject();

    expect(component.coursesService.addSubjectToCourse).toHaveBeenCalled();
    expect(component.updateTable).toHaveBeenCalled();
  });
});
