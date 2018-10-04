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
        AppComponent
      ],
      imports: [RouterTestingModule.withRoutes(routes)]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('navigate to "" redirects to /courses', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.pathname).toBe('/courses');
  }));
});
