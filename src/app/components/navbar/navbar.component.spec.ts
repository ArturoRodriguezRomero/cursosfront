import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../router/app-routing/app-routing.module';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { CoursesComponent } from '../../pages/courses/courses.component';
import { SubjectsComponent } from '../../pages/subjects/subjects.component';
import { TeachersComponent } from '../../pages/teachers/teachers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        CoursesComponent,
        SubjectsComponent,
        TeachersComponent
      ],
      imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatTableModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);

    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
