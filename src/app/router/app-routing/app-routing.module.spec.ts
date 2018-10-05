import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CoursesComponent } from '../../pages/courses/courses.component';
import { SubjectsComponent } from '../../pages/subjects/subjects.component';
import { TeachersComponent } from '../../pages/teachers/teachers.component';
import { AppComponent } from '../../app.component';
import { routes } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

describe('AppRoutingModule', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesComponent,
        SubjectsComponent,
        TeachersComponent,
        NavbarComponent,
        AppComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        MatTableModule,
        HttpClientModule
      ],
      providers: []
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
  });

  it('navigate to courses redirects to courses', fakeAsync(() => {
    router.navigate(['courses']);
    tick();
    expect(location.path()).toBe('/courses');
  }));

  it('navigate to courses/:courseId/subjects redirects to courses/:courseId/subjects', fakeAsync(() => {
    router.navigate(['courses', 1, 'subjects']);
    tick();
    expect(location.path()).toBe('/courses/1/subjects');
  }));

  it('navigate to teachers redirects to teachers', fakeAsync(() => {
    router.navigate(['teachers']);
    tick();
    expect(location.path()).toBe('/teachers');
  }));

  it('navigate to "" redirects to /courses', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/courses');
  }));

  it('navigate to ** redirects to /courses', fakeAsync(() => {
    router.navigate(['thisisarandomtest']);
    tick();
    expect(location.path()).toBe('/courses');
  }));
});
