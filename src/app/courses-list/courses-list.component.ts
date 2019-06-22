import { Component, OnInit } from '@angular/core';
import {CourseService} from './courses-list.service';
import {Course} from './course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [CourseService]
})
export class CoursesListComponent implements OnInit {
  courseList: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(courseList => this.courseList = courseList);
  }

  add(name: string): void {
    name = name.trim();
    this.courseService.addCourse({ name } as Course)
      .subscribe(course => { this.courseList.push(course); },
        error1 => {},
        () => {},
      );
  }

  delete(course: Course): void {
    this.courseList = this.courseList.filter(c => c !== course);
    this.courseService.deleteCourse(course).subscribe();
  }

}
