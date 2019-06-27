import { Component, OnInit } from '@angular/core';
import {Course} from '../courses-list/course.model';
import {TokenStorageService} from '../auth/token-storage.service';
import {COURSES} from '../courses-list/mock-course-list';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  courseList: Course[];
  authority: string;
  email: string;
  private roles: string[];


  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_STUDENT') {
          this.authority = 'student';
          this.email = this.token.getEmail();
          this.getCoursesFromUser(this.email);
          return false;
        } else if (role === 'ROLE_PROFESSOR') {
          this.authority = 'professor';
          this.email = this.token.getEmail();
          this.getCoursesFromUser(this.email);
          return false;
        }
        return true;
      });
    }
  }

  getCoursesFromUser(email: string): void {
    this.courseList = COURSES;
    this.courseList = this.courseList.filter(c => c.users.find((name) =>  name.email === email));
  }

  getGradeFromCourse(course: Course): string {
    return course.users.find(u => u.email === this.email).grade;
  }

  setGrade(course: Course, email: string, grade: string): void {
    this.courseList.find( c => c === course).users.find( u => u.email === email).grade = grade;
  }

}
