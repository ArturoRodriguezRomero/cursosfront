import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../../pages/courses/courses.component';
import { TeachersComponent } from '../../pages/teachers/teachers.component';
import { SubjectsComponent } from '../../pages/subjects/subjects.component';

export const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:courseId/subjects', component: SubjectsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
