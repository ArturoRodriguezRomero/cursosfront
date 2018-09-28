import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Observable } from 'rxjs';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css', '../../../assets/css/data-table.css']
})
export class CoursesComponent implements OnInit {
  private mockData = JSON.parse(
    `{"content":[{"name":"Metodologías ágiles","active":true,"level":"ELEMENTARY","teacher":{"name":"Roberto Canales"}},{"name":"Backup y Restore en GitLab","active":true,"level":"ELEMENTARY","teacher":{"name":"Rubén Aguilera Díaz-Heredero"}},{"name":"Instalación de GitLab con HTTPS","active":true,"level":"ELEMENTARY","teacher":{"name":"Rubén Aguilera Díaz-Heredero"}},{"name":"Kubernetes en AWS con Kops","active":true,"level":"ELEMENTARY","teacher":{"name":"Rubén Aguilera Díaz-Heredero"}},{"name":"Test E2E en Angular con Cypress","active":true,"level":"ELEMENTARY","teacher":{"name":"Rubén Aguilera Díaz-Heredero"}}],"pageable":{"sort":{"sorted":false,"unsorted":true},"offset":0,"pageSize":20,"pageNumber":0,"paged":true,"unpaged":false},"last":true,"totalPages":1,"totalElements":5,"size":20,"number":0,"numberOfElements":5,"sort":{"sorted":false,"unsorted":true},"first":true}`
  );
  private courses: Course[] = [];
  private columns = ['active', 'name', 'level', 'teacher'];

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.updateCourses();
  }

  public updateCourses() {
    console.log(this.courses);
    this.courseService.getCourses().subscribe(
      data => {
        console.log(data);
        this.courses = data;
      },
      error => {
        console.log(error);
      },
      () => {}
    );
  }
}
